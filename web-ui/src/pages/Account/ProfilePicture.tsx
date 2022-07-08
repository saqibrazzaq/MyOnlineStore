import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  shouldShowFallbackImage,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Common from "../../utility/Common";
import UserDto from "../../Models/User/UserDto";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import ErrorDetails from "../../Models/Error/ErrorDetails";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const ProfilePicture = () => {
  const [error, setError] = useState("");
  const [image, setImage] = useState(Common.DEFAULT_PROFILE_PICTURE);
  const axiosPrivate = useAxiosAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserInfo();
  }, [image]);

  const loadUserInfo = () => {
    setError("");
    axiosPrivate
      .get("User/info")
      .then((res) => {
        // console.log(res);
        if (res.data.profilePictureUrl) {
          setImage(res.data.profilePictureUrl);
        }
      })
      .catch((err) => {
        // console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const successToast = () => {
    toast({
      title: "Profile picture updated successfully",
      description: "",
      status: "success",
      position: "top-right",
    });
  }

  const showError = () => (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  const showImage = () => <Image boxSize="200px" src={image} />;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axiosPrivate.post("User/update-profile-picture", fd, config)
    .then(res => {
      // console.log(res.data);
      successToast();
      loadUserInfo();
      acceptedFiles.splice(0);
    }).catch(err => {
      console.log(err);
    })
  };

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  acceptedFiles.map((file) => {
    fd.append('File[]',file);
  })

  const showForm = () => (
    <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
      <FormControl>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </FormControl>
      <Stack spacing={6}>
        <SubmitButton text="Upload Profile Picture" />
      </Stack>
    </form>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"xl"}>User Profile Picture</Heading>
        {error && showError()}
        {image && showImage()}
        {showForm()}
      </Stack>
    </Box>
  );
};

export default ProfilePicture;

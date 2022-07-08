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
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import ForgotPasswordDto from "../../Models/User/ForgotPasswordDto";
import * as Yup from "yup";
import YupPassword from "yup-password";
import SubmitButton from "../../components/Buttons/SubmitButton";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import ErrorDetails from "../../Models/Error/ErrorDetails";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  let data = new ForgotPasswordDto("saqibrazzaq@gmail.com");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const axios = useAxiosAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const submitForm = (values: ForgotPasswordDto) => {
    setError("");
    setSuccess("");
    axios
      .get("User/send-forgot-password-email", {
        params: values,
      })
      .then((res) => {
        setSuccess("Please check email for password reset token.");
        toast({
          title: "Email sent",
          description: "Please check email to reset your password.",
          status: "success",
          position: "top-right",
        });
        navigate("/reset-password");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const showForm = () => (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        submitForm(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Field as={Input} id="email" name="email" type="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <SubmitButton text="Request Password Reset" />
          </Stack>
        </form>
      )}
    </Formik>
  );

  const showError = () => (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  const showSuccess = () => (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>Email sent</AlertTitle>
      <AlertDescription>{success}</AlertDescription>
    </Alert>
  );

  return (
    <Box p={4} justifySelf="center">
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"2xl"}>Forgot Password</Heading>
        <Text fontSize={"lg"}>You will get an email with pin code.</Text>
        {error && showError()}
        {success && showSuccess()}
        {showForm()}
      </Stack>
    </Box>
  );
};

export default ForgotPassword;

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
import SubmitButton from "../../components/Buttons/SubmitButton";
import useAuth from "../../hooks/useAuth";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import ErrorDetails from "../../Models/Error/ErrorDetails";
import AuthenticationResponseDto from "../../Models/User/AuthenticationResponseDto";
import AuthModel from "../../Models/User/AuthModel";
import RegisterUserDto from "../../Models/User/RegisterUserDto";
import UserLoginDto from "../../Models/User/UserLoginDto";
import * as AuthService from "../../Services/AuthService";

YupPassword(Yup); // extend yup

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { auth, setAuth }: AuthModel = useAuth();

  const toast = useToast();
  const axios = useAxiosAuth();
  const navigate = useNavigate();

  // const data = new RegisterUserDto(
  //   "saqib.razzaq",
  //   "saqib.razzaq@gmail.com",
  //   "Saqib123!",
  //   "Saqib123!"
  // );
  const data = new RegisterUserDto(
    "",
    "",
    "",
    ""
  );

  const submitForm = (values: RegisterUserDto) => {
    setError("");
    setSuccess("");
    axios
      .post("User/register", values)
      .then((res) => {
        setSuccess("Please check email and verify your account.");
        loginUser(new UserLoginDto(values.email, values.password));
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const loginUser = (values: UserLoginDto) => {
    AuthService.login(values)
      .then((res) => {
        let authRes: AuthenticationResponseDto = res.data;
        // console.log(authRes);
        setAuth(authRes);
        navigate("/");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Login service failed.");
        console.log("Error: " + err?.response?.data?.Message);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    username: Yup.string()
      .required("Username is required.")
      .max(50, "Maximum 50 characters."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
  });

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
            <FormControl isInvalid={!!errors.username && touched.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Field as={Input} id="username" name="username" type="text" />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Field as={Input} id="email" name="email" type="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field as={Input} id="password" name="password" type="password" />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.confirmPassword && touched.confirmPassword}
            >
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Field
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>
            <SubmitButton text="Create Account" />
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
      <AlertTitle>Account created</AlertTitle>
      <AlertDescription>{success}</AlertDescription>
    </Alert>
  );
  return (
    <Stack minH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align="center" justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Create New Account</Heading>
          {error && showError()}
          {success && showSuccess()}
          {showForm()}
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Register Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default SignUp;

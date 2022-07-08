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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import ResetPasswordDto from "../../Models/User/ResetPasswordDto";
import * as Yup from "yup";
import YupPassword from "yup-password";
import SubmitButton from "../../components/Buttons/SubmitButton";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import ErrorDetails from "../../Models/Error/ErrorDetails";
YupPassword(Yup); // extend yup

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axios = useAxiosAuth();
  const toast = useToast();

  const data = new ResetPasswordDto(
    "",
    "saqibrazzaq@gmail.com",
    "Saqib123!",
    "Saqib123!"
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
      <AlertTitle>Password reset successfull</AlertTitle>
      <AlertDescription>{success}</AlertDescription>
    </Alert>
  );

  const submitForm = (values: ResetPasswordDto) => {
    setSuccess("");
    setError("");

    axios
      .post("User/reset-password", values)
      .then((res) => {
        const successMessage = "Please use your new password to login.";
        setSuccess(successMessage);
        toast({
          title: "Password reset successfull",
          description: successMessage,
          status: "success",
          position: "top-right",
        });
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
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
    forgotPasswordToken: Yup.string().required("Token is required"),
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
            <FormControl
              isInvalid={
                !!errors.forgotPasswordToken && touched.forgotPasswordToken
              }
            >
              <FormLabel htmlFor="forgotPasswordToken">
                Reset password token
              </FormLabel>
              <Field
                as={Textarea}
                id="forgotPasswordToken"
                name="forgotPasswordToken"
              />
              <FormErrorMessage>{errors.forgotPasswordToken}</FormErrorMessage>
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
            <SubmitButton text="Reset Password" />
          </Stack>
        </form>
      )}
    </Formik>
  );

  return (
    <Box p={4} justifySelf="center">
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"2xl"}>Reset Password</Heading>
        <Text fontSize={"lg"}>
          Please check your email for the reset password token.
        </Text>
        {error && showError()}
        {success && showSuccess()}
        {showForm()}
      </Stack>
    </Box>
  );
};

export default ResetPassword;

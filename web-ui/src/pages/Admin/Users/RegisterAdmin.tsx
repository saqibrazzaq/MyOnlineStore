import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import ErrorDetails from "../../../Models/Error/ErrorDetails";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Field, Formik } from "formik";
import AuthModel from "../../../Models/User/AuthModel";
import RegisterUserRequestDto from "../../../Models/User/RegisterUserRequestDto";
import useRefreshToken from "../../../hooks/useRefreshToken";
import SubmitButton from "../../../components/Buttons/SubmitButton";

YupPassword(Yup); // extend yup

const RegisterAdmin = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { auth, setAuth }: AuthModel = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosAuth();

  const refresh = useRefreshToken();

  let host = window.location.protocol + "//" + window.location.host;
  let data = new RegisterUserRequestDto();
  data.username = "saqib1";
  data.email = "saq.ibrazzaq@gmail.com";
  data.password = "Saqib123!";
  data.confirmPassword = "Saqib123!";
  data.urlVerifyEmail = host + "/verify-email";

  // Formik validation schema
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

  const submitForm = (values: RegisterUserRequestDto) => {
    setError("");
    setSuccess("");
    console.log(values);
    axiosPrivate
      .post("User/register-admin", values)
      .then((res) => {
        console.log("New Admin user created successfully.");
        setSuccess("New Admin user created successfully.");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "User service failed.");
      });
  };

  const testAuth = () => {
    axiosPrivate
      .get("WeatherForecast/test")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <Heading fontSize={"xl"}>Create New Admin User</Heading>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Create user failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>User created</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
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
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.confirmPassword && touched.confirmPassword}
              >
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Field
                  as={Input}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <SubmitButton text="Register Admin User" />
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterAdmin;

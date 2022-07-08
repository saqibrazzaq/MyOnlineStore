import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import ErrorDetails from "../../Models/Error/ErrorDetails";
import AuthenticationResponseDto from "../../Models/User/AuthenticationResponseDto";
import UserLoginDto from "../../Models/User/UserLoginDto";
import * as AuthService from "../../Services/AuthService";
import useAuth from "../../hooks/useAuth";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import AuthModel from "../../Models/User/AuthModel";

YupPassword(Yup); // extend yup

export default function Login() {
  const [error, setError] = useState("");

  const { auth, setAuth }: AuthModel = useAuth();
  const navigate = useNavigate();

  let loginData = new UserLoginDto("saqibrazzaq@gmail.com", "Saqib123!");
  // let loginData = new UserLoginDto("", "");

  const submitForm = (values: UserLoginDto) => {
    setError("");
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

  // Formik validation schema
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
  });

  return (
    <Stack minH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Formik
          initialValues={loginData}
          onSubmit={(values) => {
            submitForm(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
                <Heading fontSize={"2xl"}>Sign in to your account</Heading>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Login failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
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
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link
                      as={RouteLink}
                      to="/forgot-password"
                      color={"blue.500"}
                    >
                      Forgot password?
                    </Link>
                  </Stack>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Text>Don't have an account?</Text>
                    <Link
                      as={RouteLink}
                      to="/register"
                      color={"blue.500"}
                    >
                      Create Account
                    </Link>
                  </Stack>
                  <Button type="submit" colorScheme={"blue"} variant={"solid"}>
                    Sign in
                  </Button>
                </Stack>
            </form>
          )}
        </Formik>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}

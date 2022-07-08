import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserDto from "../../Models/User/UserDto";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import { BsCheckCircle } from "react-icons/bs";
import ErrorDetails from "../../Models/Error/ErrorDetails";
import VerifyEmailDto from "../../Models/User/VerifyEmailDto";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const axiosPrivate = useAxiosAuth();
  const [user, setUser] = useState<UserDto>();
  const [sendEmailerror, setSendEmailError] = useState("");
  const [sendEmailSuccess, setSendEmailSuccess] = useState("");
  const [verifyEmailError, setVerifyEmailError] = useState("");
  const [verifyEmailSuccess, setVerifyEmailSuccess] = useState("");
  const [pinCodeValue, setPinCodeValue] = useState("");

  let data = new VerifyEmailDto("");

  const navigate = useNavigate();

  // Formik validation schema
  const validationSchema = Yup.object({
    // pinCode: Yup.number()
    //   .required("Pin code is required")
    //   .min(1000, "4 digit pin code required")
    //   .max(9999, "4 digit pin code required"),
  });

  const submitForm = (values: VerifyEmailDto) => {
    verifyEmail(values);
  };

  const verifyEmail = (values: VerifyEmailDto) => {
    setVerifyEmailError("");
    setVerifyEmailSuccess("");
    data.pinCode = pinCodeValue;
    console.log(data);
    axiosPrivate
      .post("User/verify-email", data)
      .then((res) => {
        // console.log("Email verified successfully.");
        setVerifyEmailSuccess("Email verfied successfully.");
        setSendEmailSuccess("");
        navigate("/account/verification-status");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err?.response?.data?.Message);
        setVerifyEmailError(errDetails?.Message || "Service failed.");
      });
  };

  useEffect(() => {
    loadUserInfo();
  }, [verifyEmailSuccess]);

  const loadUserInfo = () => {
    setSendEmailError("");
    axiosPrivate
      .get("User/info")
      .then((res) => {
        // console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        // console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setSendEmailError(errDetails?.Message || "Service failed.");
      });
  };

  const sendVerificationEmail = () => {
    setSendEmailError("");
    setVerifyEmailError("");
    setSendEmailSuccess("");
    axiosPrivate
      .get("User/send-verification-email")
      .then((res) => {
        // console.log(res);
        setSendEmailSuccess(res.data);
      })
      .catch((err) => {
        // console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setSendEmailError(errDetails?.Message || "Service failed.");
      });
  };

  const showEmailVerificationError = () => (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Pin code error</AlertTitle>
      <AlertDescription>{verifyEmailError}</AlertDescription>
    </Alert>
  );

  const showEmailVerificationSuccess = () => (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>Email verified</AlertTitle>
      <AlertDescription>{verifyEmailSuccess}</AlertDescription>
    </Alert>
  );

  const showAccountVerifiedSuccess = () => (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>Account verified</AlertTitle>
      <AlertDescription></AlertDescription>
    </Alert>
  );

  const showAccountVerifiedError = () => (
    <Box>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Account is not verified</AlertTitle>
        <AlertDescription>{sendEmailerror}</AlertDescription>
      </Alert>

      <Button onClick={sendVerificationEmail} colorScheme="blue" mt={4}>
        Send Verification Email
      </Button>
    </Box>
  );

  const showPinCodeForm = () => (
    <Box p={0}>
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={9} as={Container} maxW={"3xl"}>
              {verifyEmailError && showEmailVerificationError()}
              {verifyEmailSuccess && showEmailVerificationSuccess()}
              <FormControl isInvalid={!!errors.pinCode && touched.pinCode}>
                <FormLabel htmlFor="pinCode">
                  Email sent, Enter Pin Code
                </FormLabel>
                <HStack>
                  <PinInput onChange={(e) => setPinCodeValue(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <FormErrorMessage>{errors.pinCode}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Button type="submit" colorScheme="blue">
                  Verify Pin Code
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"xl"}>Verify Account</Heading>
        {user?.emailConfirmed
          ? showAccountVerifiedSuccess()
          : showAccountVerifiedError()}

        {sendEmailSuccess && showPinCodeForm()}
      </Stack>
    </Box>
  );
};

export default VerifyAccount;

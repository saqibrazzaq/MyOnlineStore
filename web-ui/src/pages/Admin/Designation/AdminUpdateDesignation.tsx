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
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import ErrorDetails from "../../../Models/Error/ErrorDetails";
import {
  Link as RouteLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import BackButton from "../../../components/Buttons/BackButton";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import UpdateBranchRequestParams from "../../../Models/Hr/Branch/UpdateBranchRequestParams";
import UpdateDepartmentRequestParams from "../../../Models/Hr/Department/UpdateDepartmentRequestParams";
import BranchDetailResponseDto from "../../../Models/Hr/Branch/BranchDetailResponse";
import UpdateDesignationRequestParams from "../../../Models/Hr/Designation/UpdateDesignationRequestParams";
import { ErrorAlert, SuccessAlert } from "../../../Models/Error/AlertBoxes";

const AdminUpdateDesignation = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosPrivate = useAxiosAuth();
  const navigate = useNavigate();
  const params = useParams();
  const designationId = params.designationId;
  const updateText = designationId
    ? "Update Designation"
    : "Create Designation";
  const [designationData, setDesignationData] =
    useState<UpdateDesignationRequestParams>(new UpdateDesignationRequestParams(""));

  useEffect(() => {
    if (designationId) {
      loadDesignation();
    }
  }, []);

  const loadDesignation = () => {
    setError("");
    setSuccess("");
    axiosPrivate.get("Designations/" + designationId).then(res => {
      // console.log(res.data);
      setDesignationData(res.data);
    }).catch(err => {
      let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err);
        setError(errDetails?.Message || "Service failed.");
    });
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  const submitForm = (values: UpdateDesignationRequestParams) => {
    setError("");
    setSuccess("");
    // console.log(values);
    if (designationId) {
      updateDesignation(values);
    } else {
      createDesignation(values);
    }
  };

  const createDesignation = (values: UpdateDesignationRequestParams) => {
    // console.log(values);
    axiosPrivate
      .post("Designations", values)
      .then((res) => {
        setSuccess("Designation created successfully. ");
        navigate("/admin/company/Designations/update/" + res.data.designationId);
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const updateDesignation = (values: UpdateDesignationRequestParams) => {
    axiosPrivate
      .put("Designations/" + designationId, values)
      .then((res) => {
        // console.log(res.data);
        setSuccess("Designation updated successfully.");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err);
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={designationData}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              {error && <ErrorAlert description={error} />}
              {success && <SuccessAlert description={success} />}
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Designation Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <SubmitButton text={updateText} />
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>{updateText}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/company/designations/list"}>
          <BackButton />
        </Link>
      </Box>
    </Flex>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {showUpdateForm()}
      </Stack>
    </Box>
  );
};

export default AdminUpdateDesignation;

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

const AdminUpdateDepartment = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosPrivate = useAxiosAuth();
  const navigate = useNavigate();
  const params = useParams();
  const departmentId = params.departmentId;
  let [searchParams, setSearchParams] = useSearchParams();
  const [branchId, setBranchId] = useState<string>();
  const updateText = departmentId ? "Update Department" : "Create Department";
  const [departmentData, setDepartmentData] =
    useState<UpdateDepartmentRequestParams>(
      new UpdateDepartmentRequestParams("", "")
    );
  const [branchData, setBranchData] = useState<BranchDetailResponseDto>();

  useEffect(() => {
    if (departmentId) {
      loadDepartmentDetails();
    } else {
      let reqBranchId = searchParams.get("branchId") || "";
      setBranchId(reqBranchId);
      loadBranchDetails(reqBranchId);
      setDepartmentData(new UpdateDepartmentRequestParams(reqBranchId, ""));
    }
  }, [departmentId]);

  const loadDepartmentDetails = () => {
    axiosPrivate
      .get("Departments/" + departmentId)
      .then((res) => {
        // console.log(res.data);
        setDepartmentData(res.data);
        setBranchId(res.data.branchId || "");
        loadBranchDetails(res.data.branchId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBranchDetails = (branchId: string) => {
    setError("");
    console.log("Branch id: " + branchId);
    if (branchId) {
      axiosPrivate
        .get("Branches/" + branchId)
        .then((res) => {
          setBranchData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Branch not selected.");
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    branchId: Yup.string().required("Branch is required"),
  });

  const submitForm = (values: UpdateDepartmentRequestParams) => {
    setError("");
    setSuccess("");
    console.log(values);
    if (departmentId) {
      updateDepartment(values);
    } else {
      createDepartment(values);
    }
  };

  const createDepartment = (values: UpdateDepartmentRequestParams) => {
    console.log(values);
    axiosPrivate
      .post("Departments", values)
      .then((res) => {
        setSuccess("Department created successfully. ");
        navigate("/admin/company/departments/update/" + res.data.departmentId);
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const updateDepartment = (values: UpdateDepartmentRequestParams) => {
    axiosPrivate
      .put("Departments/" + departmentId, values)
      .then((res) => {
        console.log(res.data);
        setSuccess("Department updated successfully.");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        console.log("Error: " + err);
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const showUpdateError = () => (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Department update error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  const showUpdateSuccess = () => (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>Department updated</AlertTitle>
      <AlertDescription>{success}</AlertDescription>
    </Alert>
  );

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={departmentData}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              {error && showUpdateError()}
              {success && showUpdateSuccess()}
              <FormControl isInvalid={!!errors.branchId && touched.branchId}>
                <FormLabel htmlFor="branchId">Branch</FormLabel>
                <Field as={Input} id="branchId" name="branchId" type="text" />
                <Text fontSize={"xl"}>
                  {branchData?.name}, {branchData?.companyName}
                </Text>
                <FormErrorMessage>{errors.branchId}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Department Name</FormLabel>
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
        <Link ml={2} as={RouteLink} to="/admin/company/branches/list">
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

export default AdminUpdateDepartment;

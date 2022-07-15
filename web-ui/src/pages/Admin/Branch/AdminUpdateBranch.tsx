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
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import BackButton from "../../../components/Buttons/BackButton";
import CityResponseDto from "../../../Models/Cities/City/CityResponseDto";
import CityStateCountryDropdown from "../../../components/Dropdowns/CityStateCountryDropdown";
import CityDetailResponseDto from "../../../Models/Cities/City/CityDetailResponseDto";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import UpdateBranchRequestParams from "../../../Models/Hr/Branch/UpdateBranchRequestParams";
import CompanyDropdown from "../../../components/Dropdowns/CompanyDropdown";
import BranchResponseDto from "../../../Models/Hr/Branch/BranchResponseDto";
import CompanyResponseDto from "../../../Models/Hr/Company/CompanyResponseDto";

const AdminUpdateBranch = () => {
  const [selectedCity, setSelectedCity] = useState<CityDetailResponseDto>();
  const [selectedCompany, setSelectedCompany] = useState<CompanyResponseDto>();
  const [cityId, setCityId] = useState<string>();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosPrivate = useAxiosAuth();
  const navigate = useNavigate();
  const params = useParams();
  const branchId = params.branchId;
  const updateText = branchId ? "Update Branch" : "Create branch";
  const [branchData, setBranchData] = useState(
    new UpdateBranchRequestParams("", "", "", "", "")
  );

  useEffect(() => {
    if (branchId) {
      loadBranchDetails();
    }
  }, [branchId]);

  const loadBranchDetails = () => {
    axiosPrivate
      .get("Branches/" + branchId)
      .then((res) => {
        // console.log(res.data);
        setBranchData(res.data);
        setCityId(res.data.cityId);
        loadCompanyDetails(res.data.companyId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadCompanyDetails = (companyId: string) => {
    axiosPrivate
      .get("Companies/" + companyId)
      .then((res) => {
        setSelectedCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address1: Yup.string().max(500, "Maximum 500 characters."),
    address2: Yup.string().max(500, "Maximum 500 characters."),
    cityId: Yup.string(),
    companyId: Yup.string().required("Company is required"),
  });

  const submitForm = (values: UpdateBranchRequestParams) => {
    setError("");
    setSuccess("");
    console.log(values);
    if (branchId) {
      updateBranch(values);
    } else {
      createBranch(values);
    }
  };

  const createBranch = (values: UpdateBranchRequestParams) => {
    console.log(values);
    axiosPrivate
      .post("Branches", values)
      .then((res) => {
        setSuccess("Branch created successfully. ");
        navigate("/admin/company/branches/update/" + res.data.companyId);
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const updateBranch = (values: UpdateBranchRequestParams) => {
    axiosPrivate
      .put("Branches/" + branchId, values)
      .then((res) => {
        // console.log("Branch updated successfully.");
        setSuccess("Branch updated successfully.");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const showUpdateError = () => (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Branch update error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  const showUpdateSuccess = () => (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>Branch updated</AlertTitle>
      <AlertDescription>{success}</AlertDescription>
    </Alert>
  );

  const loadCityDetails = () => {
    if (cityId) {
      axiosPrivate
        .get("Cities/" + cityId)
        .then((res) => {
          setSelectedCity(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={branchData}
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
              <FormControl isInvalid={!!errors.companyId && touched.companyId}>
                <FormLabel htmlFor="companyId">Company</FormLabel>
                <Field
                  as={Input}
                  id="companyId"
                  name="companyId"
                  type="hidden"
                />
                <CompanyDropdown
                  selectedCompany={selectedCompany}
                  handleChange={(newValue?: CompanyResponseDto) => {
                    setFieldValue("companyId", newValue?.companyId);
                    setSelectedCompany(newValue);
                  }}
                />
                <FormErrorMessage>{errors.companyId}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Branch Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.address1 && touched.address1}>
                <FormLabel htmlFor="address1">Address Line 1</FormLabel>
                <Field as={Input} id="address1" name="address1" type="text" />
                <FormErrorMessage>{errors.address1}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.address2 && touched.address2}>
                <FormLabel htmlFor="address2">Address Line 2</FormLabel>
                <Field as={Input} id="address2" name="address2" type="text" />
                <FormErrorMessage>{errors.address2}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.cityId && touched.cityId}>
                <FormLabel htmlFor="cityId">City</FormLabel>
                <Field as={Input} id="cityId" name="cityId" type="hidden" />
                <FormLabel fontWeight={"normal"} fontSize={"lg"}>
                  {selectedCity?.name}, {selectedCity?.stateName},{" "}
                  {selectedCity?.countryName}
                </FormLabel>
                <FormErrorMessage>{errors.cityId}</FormErrorMessage>

                <CityStateCountryDropdown
                  cityId={cityId}
                  handleChange={(newValue?: CityResponseDto) => {
                    // console.log("city in company update: " + newValue?.name);
                    setFieldValue("cityId", newValue?.cityId);
                    setCityId(newValue?.cityId);
                    loadCityDetails();
                  }}
                ></CityStateCountryDropdown>
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

export default AdminUpdateBranch;

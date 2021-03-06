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
import UpdateCompanyRequestParams from "../../../Models/Hr/Company/UpdateCompanyRequestParams";
import FindByCompanyIdRequestParams from "../../../Models/Hr/Company/FindByCompanyIdRequestParams";
import BackButton from "../../../components/Buttons/BackButton";
import CityResponseDto from "../../../Models/Cities/City/CityResponseDto";
import CityStateCountryDropdown from "../../../components/Dropdowns/CityStateCountryDropdown";
import CityDetailResponseDto from "../../../Models/Cities/City/CityDetailResponseDto";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import { ErrorAlert, SuccessAlert } from "../../../Models/Error/AlertBoxes";

const AdminUpdateCompany = () => {
  const [selectedCity, setSelectedCity] = useState<CityDetailResponseDto>();
  const [cityId, setCityId] = useState<string>();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosPrivate = useAxiosAuth();
  const navigate = useNavigate();
  let params = useParams();
  const companyId = params.companyId;
  const updateText = companyId ? "Update Company" : "Create Company";
  const findCompanyReq = new FindByCompanyIdRequestParams();

  const [companyData, setCompanyData] = useState(
    new UpdateCompanyRequestParams("", "", "", "")
  );

  useEffect(() => {
    if (companyId) {
      loadCompanyDetails();
    }
  }, [companyId]);

  const loadCompanyDetails = () => {
    axiosPrivate.get("Companies/" + companyId, {
      params: findCompanyReq,
    })
      .then((res) => {
        // console.log(res.data);
        setCompanyData(res.data);
        setCityId(res.data.cityId);
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
    cityId: Yup.string()
  });

  const submitForm = (values: UpdateCompanyRequestParams) => {
    setError("");
    setSuccess("");
    console.log(values);
    if (companyId) {
      updateCompany(values);
    } else {
      createCompany(values);
    }
  };

  const createCompany = (values: UpdateCompanyRequestParams) => {
    console.log(values);
    axiosPrivate.post("Companies", values)
      .then((res) => {
        setSuccess("Company created successfully. ");
        navigate("/admin/company/update/" + res.data.companyId);
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "Company service failed.");
      });
  };

  const updateCompany = (values: UpdateCompanyRequestParams) => {
    axiosPrivate.put("Companies/" + companyId, values)
      .then((res) => {
        // console.log("Company updated successfully.");
        setSuccess("Company updated successfully.");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "Company service failed.");
      });
  };

  const loadCityDetails = () => {
    if (cityId) {
      axiosPrivate.get("Cities/" + cityId).then(res => {
        setSelectedCity(res.data);
      }).catch(err => {
        console.log(err);
      });
    }
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={companyData}
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
                <FormLabel htmlFor="name">Company Name</FormLabel>
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
                  {selectedCity?.name}, {selectedCity?.stateName}, {selectedCity?.countryName}
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
        <Link ml={2} as={RouteLink} to="/admin/company/list">
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

export default AdminUpdateCompany;

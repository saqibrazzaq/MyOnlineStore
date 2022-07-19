import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  HStack,
  Input,
  Link,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Stack,
  Text,
  useBoolean,
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
import { Field, Formik, yupToFormErrors } from "formik";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import BackButton from "../../../components/Buttons/BackButton";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import UpdateEmployeeRequestParams from "../../../Models/Hr/Employee/UpdateEmployeeRequestParams";
import CompanyDropdown from "../../../components/Dropdowns/CompanyDropdown";
import CompanyResponseDto from "../../../Models/Hr/Company/CompanyResponseDto";
import BranchDropdown from "../../../components/Dropdowns/BranchDropdown";
import BranchResponseDto from "../../../Models/Hr/Branch/BranchResponseDto";
import DepartmentDropdown from "../../../components/Dropdowns/DepartmentDropdown";
import DepartmentResponseDto from "../../../Models/Hr/Department/DepartmentResponse";
import SearchDepartmentsRequestParams from "../../../Models/Hr/Department/SearchDepartmentsRequestParams";
import Common from "../../../utility/Common";
import DepartmentDetailResponseDto from "../../../Models/Hr/Department/DepartmentDetailResponse";
import DesignationDropdown from "../../../components/Dropdowns/DesignationDropdown";
import DesignationResponseDto from "../../../Models/Hr/Designation/DesignationResponseDto";
import DesignationDetailResponseDto from "../../../Models/Hr/Designation/DesignationDetailResponseDto";
import UpdateIconButton from "../../../components/Buttons/UpdateIconButton";
import GenderDropdown from "../../../components/Dropdowns/GenderDropdown";
import GenderResponseDto from "../../../Models/Hr/Gender/GenderResponseDto";
import CityStateCountryDropdown from "../../../components/Dropdowns/CityStateCountryDropdown";
import CityResponseDto from "../../../Models/Cities/City/CityResponseDto";
import CityDetailResponseDto from "../../../Models/Cities/City/CityDetailResponseDto";
import { ErrorAlert, SuccessAlert } from "../../../Models/Error/AlertBoxes";

const AdminUpdateEmployee = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosPrivate = useAxiosAuth();
  const navigate = useNavigate();
  const params = useParams();
  const employeeId = params.employeeId;
  const updateText = employeeId ? "Update Employee" : "Create Employee";
  const [employeeData, setEmployeeData] = useState<UpdateEmployeeRequestParams>(
    new UpdateEmployeeRequestParams(
      "",
      "",
      "",
      "",
      new Date(),
      new Date(),
      "",
      "",
      "",
      "",
      "",
      ""
    )
  );
  const [departmentDetails, setDepartmentDetails] =
    useState<DepartmentDetailResponseDto>();
  const [designationDetails, setDesignationDetails] =
    useState<DesignationDetailResponseDto>();

  // For dropdowns
  const [companyId, setCompanyId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [genderCode, setGenderCode] = useState("");
  const [cityId, setCityId] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<CityDetailResponseDto>();

  const [genderDetails, setGenderDetails] = useState<GenderResponseDto>();

  useEffect(() => {
    loadEmployee();
  }, []);

  useEffect(() => {
    loadGenderDetails();
  }, [genderCode]);

  useEffect(() => {
    loadDepartmentDetails();
  }, [departmentId]);

  useEffect(() => {
    loadDesignationDetails();
  }, [designationId]);

  const loadGenderDetails = () => {
    if (genderCode) {
      axiosPrivate
        .get("Genders/" + genderCode)
        .then((res) => {
          setGenderDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loadDesignationDetails = () => {
    if (designationId) {
      axiosPrivate
        .get("Designations/" + designationId)
        .then((res) => {
          setDesignationDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loadDepartmentDetails = () => {
    if (departmentId) {
      axiosPrivate
        .get("Departments/" + departmentId)
        .then((res) => {
          setDepartmentDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loadEmployee = () => {
    if (employeeId) {
      axiosPrivate
        .get("Employees/" + employeeId)
        .then((res) => {
          setEmployeeData(res.data);
          setDepartmentId(res.data.departmentId);
          setDesignationId(res.data.designationId);
          setGenderCode(res.data.genderCode);
          setCityId(res.data.cityId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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

  // Formik validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string(),
    hireDate: Yup.date(),
    birthDate: Yup.date(),
    address1: Yup.string(),
    address2: Yup.string(),
    cityId: Yup.string(),
    departmentId: Yup.string().required("Department is required"),
    designationId: Yup.string().required("Designation is required"),
    genderCode: Yup.string().required("Gender is required"),
  });

  const submitForm = (values: UpdateEmployeeRequestParams) => {
    setError("");
    setSuccess("");
    // console.log(values);
    if (employeeId) {
      updateEmployee(values);
    } else {
      createEmployee(values);
    }
  };

  const createEmployee = (values: UpdateEmployeeRequestParams) => {
    axiosPrivate
      .post("Employees", values)
      .then((res) => {
        setSuccess("Employee created successfully. ");
        navigate("/admin/company/employees/update/" + res.data.employeeId);
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const updateEmployee = (values: UpdateEmployeeRequestParams) => {
    axiosPrivate
      .put("Employees/" + employeeId, values)
      .then((res) => {
        setSuccess("Employee updated successfully");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        console.log("Error: " + err);
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={employeeData}
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
              <FormControl
                isInvalid={!!errors.departmentId && touched.departmentId}
              >
                <FormLabel htmlFor="departmentId">Department</FormLabel>
                <Field
                  as={Input}
                  id="departmentId"
                  name="departmentId"
                  type="hidden"
                />

                <Popover placement="bottom-start">
                  <PopoverTrigger>
                    <HStack>
                      <Text>
                        {departmentDetails?.name},{" "}
                        {departmentDetails?.branchName},{" "}
                        {departmentDetails?.companyName}
                      </Text>
                      <UpdateIconButton />
                    </HStack>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight="semibold">
                      Update Department
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <CompanyDropdown
                        selectedCompany={undefined}
                        handleChange={(value: CompanyResponseDto) => {
                          console.log("Company selected: " + value?.name);
                          setCompanyId(value?.companyId || "");
                        }}
                      />
                      <BranchDropdown
                        companyId={companyId}
                        selectedBranch={undefined}
                        handleChange={(value: BranchResponseDto) => {
                          console.log("Branch selected: " + value?.name);
                          setBranchId(value?.branchId || "");
                        }}
                      />
                      <DepartmentDropdown
                        branchId={branchId}
                        selectedDepartment={undefined}
                        handleChange={(value: DepartmentResponseDto) => {
                          console.log("Department selected: " + value?.name);
                          setFieldValue("departmentId", value?.departmentId);
                          setDepartmentId(value?.departmentId || "");
                        }}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <FormErrorMessage>{errors.departmentId}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Field as={Input} id="firstName" name="firstName" type="text" />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.middleName && touched.middleName}
              >
                <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                <Field
                  as={Input}
                  id="middleName"
                  name="middleName"
                  type="text"
                />
                <FormErrorMessage>{errors.middleName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Field as={Input} id="lastName" name="lastName" type="text" />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.phoneNumber && touched.phoneNumber}
              >
                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                <Field
                  as={Input}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                />
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.hireDate && touched.hireDate}>
                <FormLabel htmlFor="hireDate">Hire Date</FormLabel>
                <Field as={Input} id="hireDate" name="hireDate" type="text" />
                <FormErrorMessage>{errors.hireDate}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.birthDate && touched.birthDate}>
                <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
                <Field as={Input} id="birthDate" name="birthDate" type="text" />
                <FormErrorMessage>{errors.birthDate}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.address1 && touched.address1}>
                <FormLabel htmlFor="address1">Address 1</FormLabel>
                <Field as={Input} id="address1" name="address1" type="text" />
                <FormErrorMessage>{errors.address1}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.address2 && touched.address2}>
                <FormLabel htmlFor="address2">Address 2</FormLabel>
                <Field as={Input} id="address2" name="address2" type="text" />
                <FormErrorMessage>{errors.address2}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.cityId && touched.cityId}>
                <FormLabel htmlFor="cityId">City</FormLabel>
                <Field as={Input} id="cityId" name="cityId" type="hidden" />
                <FormErrorMessage>{errors.cityId}</FormErrorMessage>
                <Popover placement="bottom-start">
                  <PopoverTrigger>
                    <HStack>
                      <Text>
                        {selectedCity?.name},{" "}
                        {selectedCity?.stateName},{" "}
                        {selectedCity?.countryName}
                      </Text>
                      <UpdateIconButton />
                    </HStack>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight="semibold">
                      Update City
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <CityStateCountryDropdown
                        cityId={cityId}
                        handleChange={(newValue?: CityResponseDto) => {
                          // console.log("city in company update: " + newValue?.name);
                          setFieldValue("cityId", newValue?.cityId);
                          setCityId(newValue?.cityId);
                          loadCityDetails();
                        }}
                      ></CityStateCountryDropdown>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormControl
                isInvalid={!!errors.designationId && touched.designationId}
              >
                <FormLabel htmlFor="designationId">Designation</FormLabel>
                <Field
                  as={Input}
                  id="designationId"
                  name="designationId"
                  type="hidden"
                />
                <DesignationDropdown
                  selectedDesignation={designationDetails}
                  handleChange={(value: DesignationResponseDto) => {
                    setFieldValue("designationId", value.designationId);
                    setDesignationId(value?.designationId || "");
                  }}
                />

                <FormErrorMessage>{errors.designationId}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.genderCode && touched.genderCode}
              >
                <FormLabel htmlFor="genderCode">Gender</FormLabel>
                <Field
                  as={Input}
                  id="genderCode"
                  name="genderCode"
                  type="hidden"
                />
                <GenderDropdown
                  selectedGender={genderDetails}
                  handleChange={(value: GenderResponseDto) => {
                    setFieldValue("genderCode", value?.genderCode);
                    setGenderCode(value.genderCode || "");
                  }}
                />
                <FormErrorMessage>{errors.genderCode}</FormErrorMessage>
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
        <Link ml={2} as={RouteLink} to={"/admin/company/employees/list"}>
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

export default AdminUpdateEmployee;

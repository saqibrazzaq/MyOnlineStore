import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/Buttons/BackButton";
import CancelButton from "../../../components/Buttons/CancelButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import ErrorDetails from "../../../Models/Error/ErrorDetails";
import CompanyDetailResponseDto from "../../../Models/Hr/Company/CompanyDetailResponseDto";
import HrApi from "../../../Api/HrApi";
import FindByCompanyIdRequestParams from "../../../Models/Hr/Company/FindByCompanyIdRequestParams";
import AuthModel from "../../../Models/User/AuthModel";
import useAuth from "../../../hooks/useAuth";
import DeleteCompanyRequestParams from "../../../Models/Hr/Company/DeleteCompanyRequestParams";
import CityDetailResponseDto from "../../../Models/Cities/City/CityDetailResponseDto";
import citiesApi from "../../../Api/citiesApi";

const AdminDeleteCompany = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [company, setCompany] = useState<CompanyDetailResponseDto>();
  const [error, setError] = useState("");
  const [city, setCity] = useState<CityDetailResponseDto>();

  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const { auth }: AuthModel = useAuth();
  const companyId = params.companyId;
  const deleteText = "Delete Company";
  const apiUrlParams = new FindByCompanyIdRequestParams(auth.accountId);

  const deleteCompany = () => {
    onClose();
    HrApi.delete("Companies/" + companyId, {
      params: apiUrlParams,
    })
      .then((res) => {
        toast({
          title: "Company deleted",
          description: company?.name + " deleted successfully.",
          status: "error",
          position: "top-right",
        });
        navigate("/admin/company/list");
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed");
      });
  };

  const showError = () => (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  const showCompanyInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{company?.name}</Td>
            </Tr>
            <Tr>
              <Th>Address</Th>
              <Td>
                {company?.address1 ? company.address1 : ""}
                {company?.address1 ? <Divider /> : ""}
                {company?.address2 ? company.address2 : ""}
              </Td>
            </Tr>
            <Tr>
              <Th>City</Th>
              <Td>
                {city?.name}, {city?.stateName} {city?.countryName}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <DeleteButton text="YES, I WANT TO DELETE THIS COMPANY" />
        </Link>
      </HStack>
    </div>
  );

  const showAlertDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Company
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <CancelButton />
            </Link>
            <Link onClick={deleteCompany} ml={3}>
              <DeleteButton text="Delete Company" />
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadCompany();
  }, []);

  useEffect(() => {
    loadCityDetails();
  }, [company?.cityId]);

  const loadCompany = () => {
    HrApi.get("Companies/" + companyId, {
      params: apiUrlParams,
    })
      .then((res) => {
        // console.log(res.data);
        setCompany(res.data);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed");
      });
  };

  const loadCityDetails = () => {
    
    if (company?.cityId) {
      citiesApi.get("Cities/" + company?.cityId).then(res => {
        setCity(res.data);
      }).catch(err => {
        console.log(err);
      });
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Company</Heading>
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
        <Text fontSize="xl">
          Are you sure you want to delete the following company?
        </Text>
        {error && showError()}
        {showCompanyInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  );
};

export default AdminDeleteCompany;

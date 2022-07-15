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
import AuthModel from "../../../Models/User/AuthModel";
import useAuth from "../../../hooks/useAuth";
import DeleteCompanyRequestParams from "../../../Models/Hr/Company/DeleteCompanyRequestParams";
import CityDetailResponseDto from "../../../Models/Cities/City/CityDetailResponseDto";
import BranchDetailResponseDto from "../../../Models/Hr/Branch/BranchDetailResponse";

const AdminDeleteBranch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [branch, setBranch] = useState<BranchDetailResponseDto>();
  const [error, setError] = useState("");
  const [city, setCity] = useState<CityDetailResponseDto>();

  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const axiosPrivate = useAxiosAuth();
  const branchId = params.branchId;
  
  const deleteBranch = () => {
    onClose();
    axiosPrivate.delete("Branches/" + branchId)
      .then((res) => {
        toast({
          title: "Branch deleted",
          description: branch?.name + " deleted successfully.",
          status: "error",
          position: "top-right",
        });
        navigate("/admin/company/branches/list");
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

  const showBranchInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{branch?.name}</Td>
            </Tr>
            <Tr>
              <Th>Address</Th>
              <Td>
                {branch?.address1 ? branch.address1 : ""}
                {branch?.address1 ? <Divider /> : ""}
                {branch?.address2 ? branch.address2 : ""}
              </Td>
            </Tr>
            <Tr>
              <Th>City</Th>
              <Td>
                {city?.name}, {city?.stateName} {city?.countryName}
              </Td>
            </Tr>
            <Tr>
              <Th>Department Count</Th>
              <Td>{branch?.departmentCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <DeleteButton disabled={branch?.departmentCount || 0 > 0 ? true : false} text="YES, I WANT TO DELETE THIS BRANCH" />
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
            Delete Branch
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <CancelButton />
            </Link>
            <Link onClick={deleteBranch} ml={3}>
              <DeleteButton text="Delete Branch" />
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadBranch();
  }, []);

  useEffect(() => {
    loadCityDetails();
  }, [branch?.cityId]);

  const loadBranch = () => {
    axiosPrivate.get("Branches/" + branchId)
      .then((res) => {
        // console.log(res.data);
        setBranch(res.data);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed");
      });
  };

  const loadCityDetails = () => {
    
    if (branch?.cityId) {
      axiosPrivate.get("Cities/" + branch?.cityId).then(res => {
        setCity(res.data);
      }).catch(err => {
        console.log(err);
      });
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Branch</Heading>
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
        <Text fontSize="xl">
          Are you sure you want to delete the following branch?
        </Text>
        {error && showError()}
        {showBranchInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default AdminDeleteBranch
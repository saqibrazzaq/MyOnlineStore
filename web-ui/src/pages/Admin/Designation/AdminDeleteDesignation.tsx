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
import DesignationDetailResponseDto from "../../../Models/Hr/Designation/DesignationDetailResponseDto";

const AdminDeleteDesignation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [designation, setDesignation] = useState<DesignationDetailResponseDto>();
  const [error, setError] = useState("");
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const axiosPrivate = useAxiosAuth();
  const designationId = params.designationId;
  
  const deleteDesignation = () => {
    onClose();
    axiosPrivate.delete("Designations/" + designationId)
      .then((res) => {
        toast({
          title: "Designation deleted",
          description: designation?.name + " deleted successfully.",
          status: "error",
          position: "top-right",
        });
        navigate("/admin/company/designations/list/");
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

  const showDesignationInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{designation?.name}</Td>
            </Tr>
            <Tr>
              <Th>Employee Count</Th>
              <Td>{designation?.employeeCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <DeleteButton disabled={designation?.employeeCount || 0 > 0 ? true : false} text="YES, I WANT TO DELETE THIS DESIGNATION" />
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
            Delete Designation
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <CancelButton />
            </Link>
            <Link onClick={deleteDesignation} ml={3}>
              <DeleteButton text="Delete Designation" />
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = () => {
    axiosPrivate.get("Designations/" + designationId)
      .then((res) => {
        // console.log(res.data);
        setDesignation(res.data);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed");
      });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Designation</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/company/Designations/list/"}>
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
          Are you sure you want to delete the following Designation?
        </Text>
        {error && showError()}
        {showDesignationInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default AdminDeleteDesignation
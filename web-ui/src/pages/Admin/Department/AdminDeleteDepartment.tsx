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
import { ErrorAlert } from "../../../Models/Error/AlertBoxes";
import ErrorDetails from "../../../Models/Error/ErrorDetails";
import DepartmentDetailResponseDto from "../../../Models/Hr/Department/DepartmentDetailResponse";

const AdminDeleteDepartment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [department, setDepartment] = useState<DepartmentDetailResponseDto>();
  const [error, setError] = useState("");
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const axiosPrivate = useAxiosAuth();
  const departmentId = params.departmentId;
  
  const deleteDepartment = () => {
    onClose();
    axiosPrivate.delete("Departments/" + departmentId)
      .then((res) => {
        toast({
          title: "Department deleted",
          description: department?.name + " deleted successfully.",
          status: "error",
          position: "top-right",
        });
        navigate("/admin/company/departments/list/" + department?.branchId);
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed");
      });
  };

 const showDepartmentInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{department?.name}</Td>
            </Tr>
            <Tr>
              <Th>Employee Count</Th>
              <Td>{department?.employeeCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <DeleteButton disabled={department?.employeeCount || 0 > 0 ? true : false} text="YES, I WANT TO DELETE THIS DEPARTMENT" />
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
            Delete Department
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <CancelButton />
            </Link>
            <Link onClick={deleteDepartment} ml={3}>
              <DeleteButton text="Delete Department" />
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
    axiosPrivate.get("Departments/" + departmentId)
      .then((res) => {
        // console.log(res.data);
        setDepartment(res.data);
        setError("");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed");
      });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Department</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/admin/company/departments/list/" + department?.branchId}>
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
          Are you sure you want to delete the following Department?
        </Text>
        {error && <ErrorAlert description={error} />}
        {showDepartmentInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default AdminDeleteDepartment
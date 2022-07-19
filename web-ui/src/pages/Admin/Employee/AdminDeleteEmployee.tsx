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
import CityDetailResponseDto from "../../../Models/Cities/City/CityDetailResponseDto";
import BranchDetailResponseDto from "../../../Models/Hr/Branch/BranchDetailResponse";
import EmployeeDetailResponseDto from "../../../Models/Hr/Employee/EmployeeDetailResponseDto";
import DepartmentDetailResponseDto from "../../../Models/Hr/Department/DepartmentDetailResponse";
import { ErrorAlert } from "../../../Models/Error/AlertBoxes";

const AdminDeleteEmployee = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [employee, setEmployee] = useState<EmployeeDetailResponseDto>();
  const [error, setError] = useState("");
  const [department, setDepartment] = useState<DepartmentDetailResponseDto>();

  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const axiosPrivate = useAxiosAuth();
  const employeeId = params.employeeId;
  
  const deleteEmployee = () => {
    onClose();
    axiosPrivate.delete("Employees/" + employeeId)
      .then((res) => {
        toast({
          title: "Employee deleted",
          description: employee?.firstName + " " + employee?.lastName + " deleted successfully.",
          status: "error",
          position: "top-right",
        });
        navigate("/admin/company/employees/list");
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed");
      });
  };

  const showEmployeeInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{employee?.firstName + " " + employee?.lastName}</Td>
            </Tr>
            <Tr>
              <Th>Designation</Th>
              <Td>{employee?.designationName}</Td>
            </Tr>
            <Tr>
              <Th>Department</Th>
              <Td>
                {department?.name + ", " + department?.branchName + ", " + department?.companyName}
              </Td>
            </Tr>
            
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <DeleteButton text="YES, I WANT TO DELETE THIS EMPLOYEE" />
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
            Delete Employee
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <CancelButton />
            </Link>
            <Link onClick={deleteEmployee} ml={3}>
              <DeleteButton text="Delete Employee" />
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadEmployee();
  }, []);

  useEffect(() => {
    loadDepartmentDetails();
  }, [employee?.departmentId]);

  const loadEmployee = () => {
    axiosPrivate.get("Employees/" + employeeId)
      .then((res) => {
        // console.log(res.data);
        setEmployee(res.data);
        setError("");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed");
      });
  };

  const loadDepartmentDetails = () => {
    
    if (employee?.departmentId) {
      axiosPrivate.get("Departments/" + employee?.departmentId).then(res => {
        setDepartment(res.data);
      }).catch(err => {
        console.log(err);
      });
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Employee</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to="/admin/company/employees/list">
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
          Are you sure you want to delete the following employee?
        </Text>
        {error && <ErrorAlert description={error} />}
        {showEmployeeInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default AdminDeleteEmployee
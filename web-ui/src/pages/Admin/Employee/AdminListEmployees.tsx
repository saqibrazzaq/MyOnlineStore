import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import UpdateIconButton from "../../../components/Buttons/UpdateIconButton";
import RegularButton from "../../../components/Buttons/RegularButton";
import BackButton from "../../../components/Buttons/BackButton";
import Common from "../../../utility/Common";
import PagedResponse from "../../../Models/PagedResponse";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import EmployeeResponseDto from "../../../Models/Hr/Employee/EmployeeResponseDto";
import SearchEmployeesRequestParams from "../../../Models/Hr/Employee/SearchEmployeesRequestParams";

const AdminListEmployees = () => {
  const [pagedRes, setPagedRes] = useState<PagedResponse<EmployeeResponseDto>>();
  const axiosPrivate = useAxiosAuth();
  const [searchText, setSearchText] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");
  const [branchId, setBranchId] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [designationId, setDesignationId] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");
  const [stateId, setStateId] = useState<string>("");
  const [cityId, setCityId] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);
  
  useEffect(() => {
    searchEmployees(
      new SearchEmployeesRequestParams(
        searchText,
        companyId,
        branchId,
        departmentId,
        designationId,
        countryId,
        stateId,
        cityId,
        minAge,
        maxAge,
        1,
        Common.DEFAULT_PAGE_SIZE,
        ""
      )
    );
  }, []);

  const searchEmployees = (searchParams: SearchEmployeesRequestParams) => {
    axiosPrivate
      .get("Employees/search", {
        params: searchParams,
      })
      .then((res) => {
        // console.log(res.data);
        setPagedRes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new SearchEmployeesRequestParams(
        searchText,
        companyId,
        branchId,
        departmentId,
        designationId,
        countryId,
        stateId,
        cityId,
        minAge,
        maxAge,
        previousPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchEmployees(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new SearchEmployeesRequestParams(
        searchText,
        companyId,
        branchId,
        departmentId,
        designationId,
        countryId,
        stateId,
        cityId,
        minAge,
        maxAge,
        nextPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchEmployees(searchParams);
    }
  };

  const displayEmployees = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList ? (
            pagedRes?.pagedList.map((item) => (
              <Tr key={item.employeeId}>
                <Td>{item.firstName} {item.lastName}</Td>
                <Td>
                  <Link
                    mr={2}
                    as={RouteLink}
                    to={"/admin/company/employees/update/" + item.employeeId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/admin/company/employees/delete/" + item.employeeId}
                  >
                    <DeleteIconButton />
                  </Link>
                </Td>
              </Tr>
            ))
          ) : (
            <></>
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={2} textAlign="center">
              <Button
                isDisabled={!pagedRes?.metaData?.hasPrevious}
                variant="link"
                mr={5}
                onClick={previousPage}
              >
                Previous
              </Button>
              Page {pagedRes?.metaData?.currentPage} of{" "}
              {pagedRes?.metaData?.totalPages}
              <Button
                isDisabled={!pagedRes?.metaData?.hasNext}
                variant="link"
                ml={5}
                onClick={nextPage}
              >
                Next
              </Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Employees</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouteLink} to={"/admin/company/employees/update"}>
          <RegularButton text="Create Employee" />
        </Link>
        <Link ml={2} as={RouteLink} to="/admin/company/employees/list">
          <BackButton />
        </Link>
      </Box>
    </Flex>
  );

  const displaySearchBar = () => (
    <Flex>
      <Box flex={1}>
        
      </Box>
      
      <Box ml={4}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchEmployees(
                new SearchEmployeesRequestParams(
                  searchText,
                  companyId,
                  branchId,
                  departmentId,
                  designationId,
                  countryId,
                  stateId,
                  cityId,
                  minAge,
                  maxAge,
                  1,
                  Common.DEFAULT_PAGE_SIZE,
                  ""
                )
              );
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <RegularButton
          text="Search"
          onClick={() => {
            searchEmployees(
              new SearchEmployeesRequestParams(
                searchText,
                companyId,
                branchId,
                departmentId,
                designationId,
                countryId,
                stateId,
                cityId,
                minAge,
                maxAge,
                1,
                Common.DEFAULT_PAGE_SIZE,
                ""
              )
            );
          }}
        />
      </Box>
    </Flex>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {displaySearchBar()}
        {displayEmployees()}
      </Stack>
    </Box>
  )
}

export default AdminListEmployees
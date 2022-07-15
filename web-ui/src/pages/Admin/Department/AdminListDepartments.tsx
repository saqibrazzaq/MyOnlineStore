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
import DepartmentResponseDto from "../../../Models/Hr/Department/DepartmentResponse";
import SearchDepartmentsRequestParams from "../../../Models/Hr/Department/SearchDepartmentsRequestParams";
import BranchDetailResponseDto from "../../../Models/Hr/Branch/BranchDetailResponse";

const AdminListDepartments = () => {
  const [pagedRes, setPagedRes] = useState<PagedResponse<DepartmentResponseDto>>();
  const axiosPrivate = useAxiosAuth();
  const params = useParams();
  const branchId = params.branchId;
  const [searchText, setSearchText] = useState<string>("");
  const [branchDetails, setBranchDetails] = useState<BranchDetailResponseDto>();

  useEffect(() => {
    searchDepartments(
      new SearchDepartmentsRequestParams(
        branchId,
        searchText,
        1,
        Common.DEFAULT_PAGE_SIZE,
        ""
      )
    );
  }, [branchId]);

  useEffect(() => {
    loadBranchDetails();
  }, [branchId]);

  const loadBranchDetails = () => {
    axiosPrivate.get("Branches/" + branchId).then(res => {
      // console.log(res.data);
      setBranchDetails(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const searchDepartments = (searchParams: SearchDepartmentsRequestParams) => {
    axiosPrivate
      .get("Departments/search", {
        params: searchParams,
      })
      .then((res) => {
        console.log(res.data);
        setPagedRes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new SearchDepartmentsRequestParams(
        branchId,
        searchText,
        previousPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchDepartments(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new SearchDepartmentsRequestParams(
        branchId,
        searchText,
        nextPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchDepartments(searchParams);
    }
  };

  const displayDepartments = () => (
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
              <Tr key={item.departmentId}>
                <Td>{item.name}</Td>
                <Td>
                  <Link
                    mr={2}
                    as={RouteLink}
                    to={"/admin/company/departments/update/" + item.departmentId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/admin/company/departments/delete/" + item.departmentId}
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
        <Heading fontSize={"xl"}>Departments</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouteLink} to="/admin/company/departments/update">
          <RegularButton text="Create Department" />
        </Link>
        <Link ml={2} as={RouteLink} to="/admin/company/branches/list">
          <BackButton />
        </Link>
      </Box>
    </Flex>
  );

  const displaySearchBar = () => (
    <Flex>
      <Box flex={1}>
        <Text fontSize={'xl'}>{branchDetails?.name}, {branchDetails?.companyName}</Text>
      </Box>
      
      <Box ml={4}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchDepartments(
                new SearchDepartmentsRequestParams(
                  branchId,
                  searchText,
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
            searchDepartments(
              new SearchDepartmentsRequestParams(
                branchId,
                searchText,
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
        {displayDepartments()}
      </Stack>
    </Box>
  )
}

export default AdminListDepartments
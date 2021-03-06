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
import SearchDesignationsRequestParams from "../../../Models/Hr/Designation/SearchDesignationsRequestParams";
import DesignationResponseDto from "../../../Models/Hr/Designation/DesignationResponseDto";

const AdminListDesignation = () => {
  const [pagedRes, setPagedRes] = useState<PagedResponse<DesignationResponseDto>>();
  const axiosPrivate = useAxiosAuth();
  const [searchText, setSearchText] = useState<string>("");
  
  useEffect(() => {
    searchDesignations(
      new SearchDesignationsRequestParams(
        searchText,
        1,
        Common.DEFAULT_PAGE_SIZE,
        ""
      )
    );
  }, []);

  const searchDesignations = (searchParams: SearchDesignationsRequestParams) => {
    axiosPrivate
      .get("Designations/search", {
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
      let searchParams = new SearchDesignationsRequestParams(
        searchText,
        previousPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchDesignations(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new SearchDesignationsRequestParams(
        searchText,
        nextPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchDesignations(searchParams);
    }
  };

  const displayDesignations = () => (
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
              <Tr key={item.designationId}>
                <Td>{item.name}</Td>
                <Td>
                  <Link
                    mr={2}
                    as={RouteLink}
                    to={"/admin/company/designations/update/" + item.designationId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/admin/company/designations/delete/" + item.designationId}
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
        <Heading fontSize={"xl"}>Designations</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouteLink} to={"/admin/company/designations/update"}>
          <RegularButton text="Create Designation" />
        </Link>
        <Link ml={2} as={RouteLink} to="/admin/company/list">
          <BackButton />
        </Link>
      </Box>
    </Flex>
  );

  const displaySearchBar = () => (
    <Flex>
      <Box ml={4} flex={1}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchDesignations(
                new SearchDesignationsRequestParams(
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
            searchDesignations(
              new SearchDesignationsRequestParams(
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
        {displayDesignations()}
      </Stack>
    </Box>
  )
}

export default AdminListDesignation
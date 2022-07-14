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
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import UpdateIconButton from "../../../components/Buttons/UpdateIconButton";
import RegularButton from "../../../components/Buttons/RegularButton";
import BackButton from "../../../components/Buttons/BackButton";
import Common from "../../../utility/Common";
import PagedResponse from "../../../Models/PagedResponse";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import BranchResponseDto from "../../../Models/Hr/Branch/BranchResponseDto";
import SearchBranchesRequestParams from "../../../Models/Hr/Branch/SearchBranchesRequestParams";
import CompanyDropdown from "../../../components/Dropdowns/CompanyDropdown";
import CompanyResponseDto from "../../../Models/Hr/Company/CompanyResponseDto";

const AdminListBranches = () => {
  const [pagedRes, setPagedRes] = useState<PagedResponse<BranchResponseDto>>();
  const axiosPrivate = useAxiosAuth();
  const [companyId, setCompanyId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<CompanyResponseDto>();

  const navigate = useNavigate();

  useEffect(() => {
    searchBranches(
      new SearchBranchesRequestParams(
        companyId,
        searchText,
        1,
        Common.DEFAULT_PAGE_SIZE,
        ""
      )
    );
  }, []);

  const searchBranches = (searchParams: SearchBranchesRequestParams) => {
    axiosPrivate
      .get("Branches/search", {
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
      let searchParams = new SearchBranchesRequestParams(
        companyId,
        searchText,
        previousPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchBranches(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new SearchBranchesRequestParams(
        companyId,
        searchText,
        nextPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchBranches(searchParams);
    }
  };

  const displayBranches = () => (
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
              <Tr key={item.branchId}>
                <Td>{item.name}</Td>
                <Td>
                  <Link
                    mr={2}
                    as={RouteLink}
                    to={"/admin/company/branches/update/" + item.branchId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/admin/company/branches/delete/" + item.branchId}
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
        <Heading fontSize={"xl"}>Branches</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouteLink} to="/admin/company/branches/update">
          <RegularButton text="Create branch" />
        </Link>
        <Link ml={2} as={RouteLink} to="/admin/company">
          <BackButton />
        </Link>
      </Box>
    </Flex>
  );

  const displaySearchBar = () => (
    <Flex>
      <Box flex={1}>
        <CompanyDropdown
          selectedCompany={selectedCompany}
          handleChange={(newValue?: CompanyResponseDto) => {
            setSelectedCompany(newValue);
            setCompanyId(newValue?.companyId || "");
            searchBranches(
              new SearchBranchesRequestParams(
                newValue?.companyId,
                searchText,
                1,
                Common.DEFAULT_PAGE_SIZE,
                ""
              )
            );
          }}
        />
      </Box>
      
      <Box ml={4}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchBranches(
                new SearchBranchesRequestParams(
                  companyId,
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
            searchBranches(
              new SearchBranchesRequestParams(
                companyId,
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
        {displayBranches()}
      </Stack>
    </Box>
  );
};

export default AdminListBranches;

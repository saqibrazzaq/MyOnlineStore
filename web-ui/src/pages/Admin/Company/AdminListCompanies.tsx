import {
  Box,
  Button,
  Container,
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
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { config } from "dotenv";
import React, { useEffect, useState } from "react";
import HrApi from "../../../Api/HrApi";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import useAuth from "../../../hooks/useAuth";
import CompanyResponseDto from "../../../Models/Hr/Company/CompanyResponseDto";
import GetAllCompaniesRequestParameters from "../../../Models/Hr/Company/GetAllCompaniesRequestParameters";
import AuthModel from "../../../Models/User/AuthModel";
import { Link as RouteLink } from "react-router-dom";
import UpdateIconButton from "../../../components/Buttons/UpdateIconButton";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import RegularButton from "../../../components/Buttons/RegularButton";
import BackButton from "../../../components/Buttons/BackButton";
import SearchCompaniesRequestParams from "../../../Models/Hr/Company/SearchCompaniesRequestParams";
import Common from "../../../utility/Common";
import PagedResponse from "../../../Models/PagedResponse";

const AdminListCompanies = () => {
  const { auth }: AuthModel = useAuth();
  const [pagedRes, setPagedRes] = useState<PagedResponse<CompanyResponseDto>>();

  useEffect(() => {
    searchCompanies(
      new SearchCompaniesRequestParams(
        "",
        1,
        Common.DEFAULT_PAGE_SIZE,
        "",
        auth.accountId
      )
    );
  }, []);

  const searchCompanies = (searchParams: SearchCompaniesRequestParams) => {
    HrApi.get("Companies/search", {
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
      let searchParams = new SearchCompaniesRequestParams(
        "",
        previousPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        "",
        auth.accountId
      );

      searchCompanies(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new SearchCompaniesRequestParams(
        "",
        nextPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        "",
        auth.accountId
      );

      searchCompanies(searchParams);
    }
  };

  const displayCompanies = () => (
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
              <Tr key={item.companyId}>
                <Td>{item.name}</Td>
                <Td>
                  <Link
                    mr={2}
                    as={RouteLink}
                    to={"/admin/company/update/" + item.companyId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/admin/company/delete/" + item.companyId}
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
        <Heading fontSize={"xl"}>Companies</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouteLink} to="/admin/company/update">
          <RegularButton text="Create Company" />
        </Link>
        <Link ml={2} as={RouteLink} to="/admin">
          <BackButton />
        </Link>
      </Box>
    </Flex>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {displayCompanies()}
      </Stack>
    </Box>
  );
};

export default AdminListCompanies;

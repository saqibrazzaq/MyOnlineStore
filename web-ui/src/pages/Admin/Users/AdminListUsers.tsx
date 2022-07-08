import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import PagedResponse from "../../../Models/PagedResponse";
import { Link as RouteLink } from "react-router-dom";
import UserDto from "../../../Models/User/UserDto";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import SearchUsersRequestParameters from "../../../Models/User/SearchUsersRequestParameters";
import DeleteIconButton from "../../../components/Buttons/DeleteIconButton";
import Common from "../../../utility/Common";
import BackButton from "../../../components/Buttons/BackButton";

const AdminListUsers = () => {
  const [pagedRes, setPagedRes] = useState<PagedResponse<UserDto>>();
  const axiosPrivate = useAxiosAuth();

  useEffect(() => {
    searchUsers(new SearchUsersRequestParameters("", 1, Common.DEFAULT_PAGE_SIZE, ""));
  }, []);

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new SearchUsersRequestParameters(
        "",
        previousPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchUsers(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new SearchUsersRequestParameters(
        "",
        nextPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchUsers(searchParams);
    }
  };

  const searchUsers = (searchParams: SearchUsersRequestParameters) => {
    axiosPrivate
      .get("User/search-users", {
        params: searchParams,
      })
      .then((res) => {
        let userRes: PagedResponse<UserDto> = res.data;
        // console.log(userRes.metaData);
        setPagedRes(userRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Search Users</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to="/admin">
          <BackButton />
        </Link>
      </Box>
    </Flex>
  );

  const displayUsers = () => (
    <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {pagedRes?.pagedList ? (
                pagedRes.pagedList.map((item) => (
                  <Tr key={item.email}>
                    <Td>{item.userName}</Td>
                    <Td>{item.email}</Td>
                    <Td>
                      <Link as={RouteLink} to={"/admin/users/delete/" + item.userName}>
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
                <Th colSpan={3} textAlign="center">
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
  )

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {displayUsers()}
      </Stack>
    </Box>
  );
};

export default AdminListUsers;

import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { FiUsers, FiHome, FiTrendingUp } from "react-icons/fi";
import {GrUserAdmin} from 'react-icons/gr';
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";

const LinkItems: Array<LinkItemProps> = [
  { name: "Back", icon: FiHome, href: "/admin" },
  { name: "Register Admin", icon: GrUserAdmin, href: "/admin/users/register-admin" },
  { name: "Users", icon: FiUsers, href: "/admin/users/list" },
];

const AdminUsersLayout = () => {
  return (
    <Flex mt="2">
      <Box w="250px">
        <LeftSideMenu menuHeading="Users" menuItems={LinkItems} />
      </Box>
      <Center bg="gray.300" w="1px"></Center>
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default AdminUsersLayout
import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import TopNavbar from "../header/top-navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
function Layout() {
  return (
    <ChakraProvider theme={theme}>
      <Box >
        <Grid minH="70vh" p={3}>
          <TopNavbar />
          <Outlet />
          <Footer />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default Layout;

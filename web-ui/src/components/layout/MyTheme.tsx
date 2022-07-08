import { extendTheme } from "@chakra-ui/react";

export const myTheme = extendTheme({
  colors: {
    brand: {
      50: "#ffe0cd",
      100: "#ffe0cd",
      500: "#ffe0cd", // you need this
    }
  }
});
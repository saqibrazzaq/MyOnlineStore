import { IconButton } from "@chakra-ui/react";
import React from "react";
import { AiFillEdit } from "react-icons/ai";

const UpdateIconButton = () => {
  return (
    <IconButton
      variant="outline"
      size="sm"
      fontSize="18px"
      colorScheme="blue"
      icon={<AiFillEdit />}
      aria-label="Edit"
    />
  )
}

export default UpdateIconButton
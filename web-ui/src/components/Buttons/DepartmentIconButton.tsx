import { IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { VscOrganization } from "react-icons/vsc";

const DepartmentIconButton = () => {
  return (
    <Tooltip label="Departments">
    <IconButton
      variant="outline"
      size="sm"
      fontSize="18px"
      colorScheme="blue"
      icon={<VscOrganization />}
      aria-label="Edit"
    />
    </Tooltip>
  )
}

export default DepartmentIconButton
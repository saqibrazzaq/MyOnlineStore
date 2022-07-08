import { Button } from '@chakra-ui/react';
import React from 'react'

interface DeleteButtonProps {
  text?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  let text = "Submit";

  if (props.text) text = props.text;

  return (
    <Button colorScheme="red">
      {text}
    </Button>
  )
}

export default DeleteButton
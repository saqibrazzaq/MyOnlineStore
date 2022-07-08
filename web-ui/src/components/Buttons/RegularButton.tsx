import { Button } from '@chakra-ui/react';
import React from 'react'

interface RegularButtonProps {
  text?: string;
}

const RegularButton: React.FC<RegularButtonProps> = (props) => {
  return (
    <Button colorScheme="blue">
      {props.text}
    </Button>
  )
}

export default RegularButton
import { VStack, Button, HStack, Center } from "@chakra-ui/react";
import Box from "components/motion/Box";
import React from "react";
import Image from "next/image";

interface SignInProps {
  signInMethods: {
    type: string;
    label: string;
    icon: {
      src: string;
      alt: string;
    };
    callback: () => void;
  }[];
}

const SignInButtons = ({ signInMethods }: SignInProps) => {
  return (
    <VStack>
      {signInMethods.map((method, index) => (
        <Button
          variant="menu"
          borderRadius="4.53px"
          border="1px solid white"
          h="43px"
          w="300px"
          key={index}
          onClick={method.callback}
          _hover={{ bg: "white", color: "black" }}
          color="white"
        >
          <HStack w="100%" justifyContent="space-between">
            <Box w="24px" h="24px" position="relative">
              <Image
                src={method.icon.src}
                alt={method.icon.alt}
                layout="fill"
                objectFit="contain"
              />
            </Box>
            <Center h="43px" borderLeft="1px solid white" w="80%">
              {method.label}
            </Center>
            <Box />
          </HStack>
        </Button>
      ))}
    </VStack>
  );
};

export default SignInButtons;

import { HStack, Link, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
  return (
    <HStack as="footer" width="full" align="center">
      <AiOutlineCopyright />
      <Text variant="overline">
        {new Date().getFullYear()} -{" "}
        <Link href="" isExternal>
          The Social Census
        </Link>
      </Text>
    </HStack>
  );
};

export default Footer;

import {
  ArrowBackIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/layout";
import { Input, Text, useClipboard, useToast } from "@chakra-ui/react";
import InputWithIcon from "components/InputWithIcon";
import NavMenu from "components/layout/menu/NavMenu";
import Card from "components/micro/Card";
import React, { useRef } from "react";
import { useMatchCode } from "utils/api/hooks";
import WebShare from "utils/web-share/WebShare";

const Match = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <Box>
      {/* match responses header */}
      <Flex
        as="header"
        width="full"
        align="center"
        justify="space-between"
        mb={6}
      >
        <Box w="32px" h="32px">
          <ChevronLeftIcon w="100%" h="100%" />
        </Box>
        <Heading as="h1" variant="headline">
          Questions You&apos;ve Answered
        </Heading>
        <Box w="32px" h="32px" />
      </Flex>

      {/* content */}
    </Box>
  );
};

export default Match;

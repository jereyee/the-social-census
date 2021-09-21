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
import { Input, Text } from "@chakra-ui/react";
import NavMenu from "components/layout/menu/NavMenu";
import Card from "components/micro/Card";
import React from "react";
import WebShare from "utils/web-share/WebShare";

const Match = () => (
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
        Match Responses
      </Heading>
      <Box w="32px" h="32px" />
    </Flex>

    {/* content */}
    <VStack spacing={8}>
      <VStack spacing={4}>
        <Circle w="132px" h="132px" bg="white" />
        <Heading as="h3" variant="body" textAlign="center">
          Discover similarities with your friends. <br />
          Let the results surprise you.
        </Heading>
      </VStack>
      <VStack w="90%" spacing={6}>
        {/* link sharing */}
        <VStack w="100%">
          <Text variant="caption" alignSelf="flex-start">
            Share with them a link:
          </Text>
          <Card w="100%" h="44px">
            <HStack justifyContent="space-between" w="100%" h="100%" px={4}>
              <Text>hello</Text>
              <CopyIcon h="24px" w="24px" />
            </HStack>
          </Card>
          <Box alignSelf="flex-start" pt={2}>
            <WebShare
              questionId={0}
              buttonVariant="primary"
              buttonProps={{ bg: "brand.magenta" }}
            />
          </Box>
        </VStack>

        {/* your code */}
        <VStack w="100%">
          <Text variant="caption" alignSelf="flex-start">
            Or send them your code:
          </Text>
          <Card w="100%" h="44px">
            <HStack justifyContent="space-between" w="100%" h="100%" px={4}>
              <Text>hello</Text>
              <CopyIcon h="24px" w="24px" />
            </HStack>
          </Card>
        </VStack>

        {/* enter a code */}
        <VStack w="100%">
          <Text variant="caption" alignSelf="flex-start">
            Enter your friend&apos;s code:
          </Text>
          <Card w="100%" h="44px">
            <Input type="text" />
          </Card>
        </VStack>

        {/* history */}
        <VStack w="100%">
          <Text variant="caption" alignSelf="flex-start">
            History:
          </Text>
          <Card w="100%" h="44px">
            <HStack spacing={4} w="100%" h="100%" px={4}>
              <Circle size="24px" bg="grey" />
              <Circle size="24px" bg="grey" />
              <Circle size="24px" bg="grey" />
              <Circle size="24px" bg="grey" />
            </HStack>
          </Card>
        </VStack>
        {/* different bars */}
      </VStack>
    </VStack>
  </Box>
);

export default Match;

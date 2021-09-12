import {
  Box,
  Heading,
  VStack,
  Button,
  Circle,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Carousel } from "components/carousel";
import React, { useCallback, useEffect, useState } from "react";
import { APP_NAME, APP_TAGLINE } from "./_document";

const Home = () => {
  return (
    <VStack mb={8} w="full" spacing={10} pt="5%" h="85vh">
      <VStack spacing={2}>
        <Heading as="h1" variant="title">
          {APP_NAME}
        </Heading>
        <Heading as="h2" variant="headline" color="#CFCFCF">
          {APP_TAGLINE}
        </Heading>
      </VStack>

      <Carousel />

      <Button as="a" href="/home" variant="primary" w="95px">
        Begin
      </Button>
    </VStack>
  );
};

export default Home;

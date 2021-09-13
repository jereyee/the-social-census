import { Button, Heading, VStack } from "@chakra-ui/react";
import { Carousel } from "components/carousel";
import Link from "next/link";
import React from "react";
import { APP_NAME, APP_TAGLINE } from "./_document";

const Home = () => {
  return (
    <VStack mb={8} w="full" spacing={10} py="5%">
      <VStack spacing={2}>
        <Heading as="h1" variant="title">
          {APP_NAME}
        </Heading>
        <Heading as="h2" variant="headline" color="#CFCFCF">
          {APP_TAGLINE}
        </Heading>
      </VStack>

      <Carousel />
      <Button variant="primary" w="135px">
        <Link href="/login">Get Started</Link>
      </Button>
    </VStack>
  );
};

export default Home;

import { HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";

const ScaleEnds = () => (
  <HStack justifyContent="space-between" w="120%">
    <Text variant="overline" maxW="10ch" textAlign="center">
      Can&apos;t relate at all
    </Text>
    <Text variant="overline" maxW="10ch" textAlign="center">
      Relate completely
    </Text>
  </HStack>
);

export default ScaleEnds;

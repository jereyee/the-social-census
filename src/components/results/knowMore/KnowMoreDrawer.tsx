import { Heading, Box } from "@chakra-ui/layout";
import {
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/modal";
import { Button, Text } from "@chakra-ui/react";
import React from "react";

export interface IKnowMore {
  data: {
    didYouKnow: string;
    sources: {
      url: string;
      title: string;
    }[];
  };
  onClose: () => void;
}

const KnowMoreDrawer = ({ data, onClose }: IKnowMore) => {
  return (
    <DrawerContent height="80vh" borderTopRadius="25px" bg="grayscale.gray.300">
      <DrawerCloseButton />
      <DrawerHeader>Did you know?</DrawerHeader>

      <DrawerBody>
        <Text variant="body">{data.didYouKnow}</Text>
        <Heading as="h6" variant="headline" mt={6} mb={4}>
          Sources
        </Heading>
        <Text variant="body">{data.sources}</Text>
      </DrawerBody>

      <DrawerFooter>
        <Box />
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default KnowMoreDrawer;

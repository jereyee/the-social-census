import { Heading, Box } from "@chakra-ui/layout";
import {
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/modal";
import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IKnowMoreDrawer {
  data: {
    body: string;
    sources: {
      url: string;
      title: string;
    }[];
  };
  onClose: () => void;
}

const KnowMoreDrawer = ({ data, onClose }: IKnowMoreDrawer) => {
  return (
    <DrawerContent height="80vh" borderTopRadius="25px" bg="grayscale.gray.300">
      <DrawerCloseButton />
      <DrawerHeader>Did you know?</DrawerHeader>

      <DrawerBody>
        <Text variant="body">{data.body}</Text>
        <Heading as="h6" variant="headline" mt={6} mb={4}>
          Sources
        </Heading>
        {data.sources.map((source, index) => (
          <Text
            key={index}
            variant="body"
            color="brand.pink"
            textDecoration="underline"
          >
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title}
            </a>
          </Text>
        ))}
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

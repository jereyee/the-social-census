import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { VStack, HStack, Circle, Divider, Box } from "@chakra-ui/layout";
import {
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/modal";
import { Button, Text } from "@chakra-ui/react";
import { ICommentsList } from "pages/result";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import Likes from "../CommentLikes";

interface IReplies {
  data: ICommentsList;
  onClose: () => void;
  onRepliesClose: () => void;
}

const RepliesDrawer = ({ data, onClose, onRepliesClose }: IReplies) => {
  return (
    <DrawerContent
      height="80vh"
      top="unset !important"
      right="unset !important"
      borderTopRadius="25px"
      left={0}
      maxW="100vw !important"
    >
      <DrawerCloseButton onClick={onClose} />
      <DrawerHeader>
        <ChevronLeftIcon
          w={6}
          h={6}
          mr={2}
          onClick={onRepliesClose}
          _hover={{
            cursor: "pointer",
            color: "brand.magenta",
            backgroundColor: "grayscale.white.60",
          }}
        />
        Replies
      </DrawerHeader>

      <DrawerBody>
        <VStack alignItems="flex-start" spacing={4}>
          <HStack alignItems="flex-start">
            <Circle size="30px" bg="white" />
            <VStack alignItems="flex-start">
              <VStack alignItems="flex-start">
                <Text variant="overline">
                  {data.uid.substring(0, 10)} - 1 day ago
                </Text>
                <Text variant="body">{data.body}</Text>
                <Likes id={data.id} likes={data.likes} />
              </VStack>
            </VStack>
          </HStack>
          <HStack>
            <Circle size="32px" bg="black" />
            <Input placeholder="Add a public reply..." />
          </HStack>

          <Divider />
        </VStack>
        {data.children.map((comment, index) => (
          <React.Fragment key={index}>
            <VStack alignItems="flex-start" py={4}>
              <HStack alignItems="flex-start">
                <Circle size="30px" bg="black" />
                <VStack alignItems="flex-start">
                  <VStack alignItems="flex-start">
                    <Text variant="overline">
                      {comment.uid.substring(0, 10)} - 1 day ago
                    </Text>
                    <Text variant="body">{comment.body}</Text>
                    <Likes id={comment.id} likes={comment.likes} />
                  </VStack>
                </VStack>
              </HStack>
            </VStack>
            <Divider />
          </React.Fragment>
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

export default RepliesDrawer;

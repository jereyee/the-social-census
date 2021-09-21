import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { HStack, Circle, Divider, VStack, Box } from "@chakra-ui/layout";
import {
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Drawer,
  DrawerOverlay,
} from "@chakra-ui/modal";
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import { ICommentsList } from "pages/result";
import React, { useRef, useState } from "react";
import { AiOutlineLike, AiOutlineMore } from "react-icons/ai";
import Likes from "./CommentLikes";
import RepliesDrawer from "./replies/RepliesDrawer";

export interface IComments {
  data: ICommentsList[];
  onClose: () => void;
}

const CommentsDrawer = ({ data, onClose }: IComments) => {
  const {
    isOpen: isRepliesOpen,
    onOpen: onRepliesOpen,
    onClose: onRepliesClose,
  } = useDisclosure();
  const repliesRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [clickedComment, setClickedComment] = useState<
    ICommentsList | undefined
  >(undefined);

  if (clickedComment && !isRepliesOpen) {
    onRepliesOpen();
  }

  return (
    <DrawerContent height="80vh" borderTopRadius="25px">
      <DrawerCloseButton />
      <DrawerHeader>Comments</DrawerHeader>

      <DrawerBody>
        <HStack my={4}>
          <Circle size="32px" bg="black" />
          <Input placeholder="Add a public comment..." />
        </HStack>
        <Divider />
        {data.map((comment, index) => (
          <React.Fragment key={index}>
            <VStack alignItems="flex-start" py={4}>
              <HStack
                alignItems="flex-start"
                justifyContent="space-between"
                w="100%"
              >
                <HStack alignItems="flex-start">
                  <Circle size="30px" bg="black" />
                  <VStack alignItems="flex-start">
                    <VStack alignItems="flex-start">
                      <Text variant="overline">
                        {comment.uid.substring(0, 10)} - 1 day ago
                      </Text>
                      <Text variant="body">{comment.body}</Text>
                      <Likes likes={comment.likes} id={comment.id} />
                    </VStack>
                    <Text
                      variant="headline"
                      color="brand.pink"
                      ref={repliesRef}
                      onClick={() => setClickedComment(comment)}
                      data-question-index={index}
                      _hover={{
                        cursor: "pointer",
                        color: "brand.magenta",
                        backgroundColor: "grayscale.white.60",
                      }}
                    >
                      {comment.children.length}{" "}
                      {comment.children.length === 1 ? "REPLY" : "REPLIES"}
                    </Text>
                  </VStack>
                </HStack>
                {/* more button */}
                <Menu>
                  <MenuButton
                    as={Button}
                    bg="none"
                    _active={{ bg: "none" }}
                    _focus={{ bg: "none" }}
                    _hover={{ bg: "none" }}
                  >
                    <AiOutlineMore />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Report</MenuItem>
                    {/* <MenuItem>Delete</MenuItem> */}
                  </MenuList>
                </Menu>
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

      <Drawer
        isOpen={isRepliesOpen}
        placement="right"
        onClose={onRepliesClose}
        finalFocusRef={repliesRef}
        autoFocus={false}
      >
        <DrawerOverlay />
        <RepliesDrawer
          data={clickedComment!}
          onClose={onClose}
          onRepliesClose={() => {
            setClickedComment(undefined);
            onRepliesClose();
          }}
        />
      </Drawer>
    </DrawerContent>
  );
};

export default CommentsDrawer;

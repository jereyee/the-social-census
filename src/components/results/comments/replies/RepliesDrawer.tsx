import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Divider, HStack, VStack } from "@chakra-ui/layout";
import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@chakra-ui/modal";
import { Button, Text } from "@chakra-ui/react";
import InputWithIcon from "components/InputWithIcon";
import UserAvatar from "components/layout/menu/UserAvatar";
import router from "next/dist/client/router";
import nookies from "nookies";
import { ICommentsList } from "pages/result";
import React, { useRef } from "react";
import { submitComment } from "utils/api/POST";
import { useAuth } from "utils/auth/AuthProvider";
import { timeOfCommentChecker } from "utils/dateParser";
import Likes from "../CommentLikes";

interface IReplies {
  data: ICommentsList;
  onClose: () => void;
  onRepliesClose: () => void;
  onUserReplySubmitted: ({
    submit,
    success,
  }: {
    submit: boolean;
    success: boolean;
  }) => void;
}

const RepliesDrawer = ({
  data,
  onClose,
  onRepliesClose,
  onUserReplySubmitted,
}: IReplies) => {
  const token = nookies.get(undefined, "token");

  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const { user } = useAuth();

  const submitUserReply = (body: string) => {
    if (token) {
      submitComment({
        comment: { body: body, parentId: data.id },
        questionId: data.questionId,
        token: token.token,
      })
        .then((data) => {
          console.log(data);
          onUserReplySubmitted({ submit: true, success: true });
        })
        .catch((error) => {
          console.log(error);
          onUserReplySubmitted({ submit: true, success: false });
        });
    } else {
      console.log("Not signed in.");
      void router.push("/login");
    }
  };

  return (
    <DrawerContent
      height="70vh"
      top="unset !important"
      right="unset !important"
      borderTopRadius="25px"
      left={0}
      maxW="100vw !important"
      bg="grayscale.gray.300"
    >
      <DrawerCloseButton size="lg" mr={2} mt={2} onClick={onClose} />
      <DrawerHeader mt={2}>
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
            <UserAvatar
              currentUser={false}
              otherUser={{
                displayName: data.user.displayName,
                photoURL: data.user.photoURL,
              }}
            />
            <VStack alignItems="flex-start">
              <VStack alignItems="flex-start">
                <Text variant="overline">
                  {data.user.displayName} -{" "}
                  {`${timeOfCommentChecker(data.createdAt).number} ${
                    timeOfCommentChecker(data.createdAt).metric
                  } ago`}
                </Text>
                <Text variant="body">{data.body}</Text>
                <Likes
                  commentId={data.id}
                  likes={data.likes}
                  questionId={data.questionId}
                />
              </VStack>
            </VStack>
          </HStack>
          <HStack>
            <UserAvatar currentUser={true} />
            <InputWithIcon
              placeholder="Add a public reply"
              onSubmitClicked={submitUserReply}
              inputRef={inputRef}
            />
          </HStack>

          <Divider />
        </VStack>
        {data.children
          .slice()
          .reverse()
          .map((comment, index) => {
            return (
              <React.Fragment key={index}>
                <VStack alignItems="flex-start" py={4}>
                  <HStack alignItems="flex-start">
                    <UserAvatar
                      currentUser={false}
                      otherUser={{
                        displayName: comment.user.displayName,
                        photoURL: comment.user.photoURL,
                      }}
                    />
                    <VStack alignItems="flex-start">
                      <VStack alignItems="flex-start">
                        <Text variant="overline">
                          {comment.user.displayName} -{" "}
                          {`${timeOfCommentChecker(data.createdAt).number} ${
                            timeOfCommentChecker(data.createdAt).metric
                          } ago`}
                        </Text>
                        <Text variant="body">{comment.body}</Text>
                        <Likes
                          commentId={comment.id}
                          likes={comment.likes}
                          questionId={comment.questionId}
                        />
                      </VStack>
                    </VStack>
                  </HStack>
                </VStack>
                <Divider />
              </React.Fragment>
            );
          })}
      </DrawerBody>

      <DrawerFooter></DrawerFooter>
    </DrawerContent>
  );
};

export default RepliesDrawer;

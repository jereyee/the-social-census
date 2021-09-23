import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Divider, HStack, VStack } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/modal";
import {
  Button, Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast
} from "@chakra-ui/react";
import AlertModal from "components/AlertModal";
import ErrorModal from "components/ErrorModal";
import InputWithIcon from "components/InputWithIcon";
import UserAvatar from "components/layout/menu/UserAvatar";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import { ICommentsList } from "pages/result";
import React, { useRef, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { deleteComment } from "utils/api/DELETE";
import { fetchQuestionComments } from "utils/api/GET";
import { reportComment, submitComment } from "utils/api/POST";
import { useAuth } from "utils/auth/AuthProvider";
import { timeOfCommentChecker } from "utils/dateParser";
import Likes from "./CommentLikes";
import RepliesDrawer from "./replies/RepliesDrawer";

export interface IComments {
  data: ICommentsList[];
  onClose: () => void;
  refreshComments: () => void;
  questionId: number;
}

const ReportInput = ({
  inputRef,
  placeholder,
  username,
}: {
  inputRef: React.MutableRefObject<HTMLInputElement>;
  placeholder: string;
  username: string;
}) => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <VStack spacing={4}>
      <Text textAlign="center">
        Are you sure you want to report {username}? <br />
        Help us know why.
      </Text>
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        ref={inputRef}
      />
    </VStack>
  );
};

const CommentsDrawer = ({
  data,
  onClose,
  refreshComments,
  questionId,
}: IComments) => {
  const { user } = useAuth();

  const {
    isOpen: isRepliesOpen,
    onOpen: onRepliesOpen,
    onClose: onRepliesClose,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  const repliesRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const reportRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const router = useRouter();

  const [clickedComment, setClickedComment] = useState<
    ICommentsList | undefined
  >(undefined);

  const [commentSubmitted, setCommentSubmitted] = useState({
    submit: false,
    success: false,
  });

  const [commentsList, setCommentsList] = useState(data);
  const toast = useToast();

  if (clickedComment && !isRepliesOpen) {
    onRepliesOpen();
  }

  const token = nookies.get(undefined, "token");

  if (commentSubmitted.submit) {
    if (commentSubmitted.success) {
      /* the reason you are fetching again is to avoid UI discrepancies due to the parent components */
      /* not updating. I recommend working and trying to find a simpler solution if time permits */
      fetchQuestionComments(token.token, questionId)
        .then((v) => {
          if (isRepliesOpen && clickedComment)
            /* if the replies drawer is open need to update the UI */
            setClickedComment(
              v.find((value) => value.id === clickedComment.id)
            );
          setCommentsList(v);
        })
        .catch((err) => console.log(err));
    } else if (!commentSubmitted.success) {
      onErrorOpen();
    }

    setCommentSubmitted({ submit: false, success: false });
  }

  const submitUserComment = (body: string) => {
    if (token) {
      submitComment({
        comment: { body: body, parentId: null },
        questionId: questionId,
        token: token.token,
      })
        .then((data) => {
          console.log(data);
          refreshComments();
          setCommentSubmitted({ submit: true, success: true });
        })
        .catch((error) => {
          console.log(error);
          setCommentSubmitted({ submit: true, success: false });
        });
    } else {
      console.log("Not signed in.");
      void router.push("/login");
    }
  };

  const userReplySubmitted = ({
    submit,
    success,
  }: {
    submit: boolean;
    success: boolean;
  }) => {
    setCommentSubmitted({ submit: submit, success: success });
  };

  const deleteUserComment = (comment: ICommentsList) => {
    deleteComment({
      comment: comment,
      questionId: questionId,
      token: token.token,
    })
      .then((data) => {
        console.log(data);
        fetchQuestionComments(token.token, questionId)
          .then((v) => {
            refreshComments();
            setCommentsList(v);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Failed to delete comment. Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const reportUserComment = (comment: ICommentsList) => {
    reportComment({
      commentId: comment.id,
      questionId: questionId,
      token: token.token,
      reason: reportRef.current.value,
    })
      .then((data) => {
        console.log(data);
        toast({
          title: "Sucessfully Reported!",
          description:
            "Our moderators have received your report and will look into it. Thank you for notifying us.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Failed to report comment. Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <DrawerContent height="70vh" borderTopRadius="25px" bg="grayscale.gray.300">
      <DrawerCloseButton />
      <DrawerHeader>Comments</DrawerHeader>

      <DrawerBody>
        <HStack my={4}>
          <UserAvatar currentUser={true} />
          <InputWithIcon
            placeholder="Add a public comment..."
            onSubmitClicked={submitUserComment}
            inputRef={inputRef}
          />
          <ErrorModal
            error="Couldn't submit comment! <br/> Please try again."
            isOpen={isErrorOpen}
            onClose={onErrorClose}
            finalFocusRef={inputRef}
          />
        </HStack>
        <Divider />
        {commentsList.map((comment, index) => {
          const modalButtonStyles = {
            variant: "naked",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            px: 0,
            fontSize: "16px",
            color: "white",
            py: 0,
          };
          return (
            <React.Fragment key={index}>
              <VStack alignItems="flex-start" py={4}>
                <HStack
                  alignItems="flex-start"
                  justifyContent="space-between"
                  w="100%"
                >
                  <HStack alignItems="flex-start">
                    <UserAvatar
                      currentUser={false}
                      otherUser={{
                        displayName: comment.user.displayName,
                        photoURL: comment.user.photoURL,
                      }}
                    />
                    =
                    <VStack alignItems="flex-start">
                      <VStack alignItems="flex-start">
                        <Text variant="overline">
                          {comment.user.displayName} -{" "}
                          {`${timeOfCommentChecker(comment.createdAt).number} ${
                            timeOfCommentChecker(comment.createdAt).metric
                          } ago`}
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
                      <MenuItem>
                        <AlertModal
                          header="Report comment"
                          buttonText="Report"
                          buttonProps={{ ...modalButtonStyles }}
                          onButtonClick={() => reportUserComment(comment)}
                          alertBody={
                            <ReportInput
                              inputRef={reportRef}
                              placeholder="Your reason"
                              username={comment.user.displayName}
                            />
                          }
                          // message={`Are you sure you want to report ${comment.user.displayName}?`}
                        />
                      </MenuItem>
                      {user && comment.user.uid === user.uid && (
                        <MenuItem>
                          <AlertModal
                            header="Delete comment"
                            buttonText="Delete"
                            buttonProps={{ ...modalButtonStyles }}
                            onButtonClick={() => deleteUserComment(comment)}
                          />
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </HStack>
              </VStack>
              <Divider />
            </React.Fragment>
          );
        })}
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
          onUserReplySubmitted={userReplySubmitted}
        />
      </Drawer>
    </DrawerContent>
  );
};

export default CommentsDrawer;

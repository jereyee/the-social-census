import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Divider, HStack, VStack } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import {
  Button,
  CircularProgress,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import AlertModal from "components/AlertModal";
import ErrorModal from "components/ErrorModal";
import InputWithIcon from "components/InputWithIcon";
import UserAvatar from "components/layout/menu/UserAvatar";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import useSWR from "swr";
import { IComments, ICommentsList, IQuestion } from "types/shared";
import { deleteComment } from "utils/api/DELETE";
import { getEndpoint, APIEndpoints } from "utils/api/functions";
import { fetcher, fetchQuestionComments } from "utils/api/GET";
import { reportComment, submitComment } from "utils/api/POST";
import { useAuth } from "utils/auth/AuthProvider";
import { timeOfCommentChecker } from "utils/dateParser";
import Likes from "./CommentLikes";
import ReportInput from "./helpers/ReportInput";
import RepliesDrawer from "./replies/RepliesDrawer";

interface ICommentSubmitted {
  success: boolean;
  submit: boolean;
}

const CommentsDrawer = ({ onClose, questionData }: IComments) => {
  /* user related hooks */
  const { user } = useAuth();
  const token = nookies.get(undefined, "token");

  /* fetch all comments for this question */
  const {
    data: commentsData,
    isValidating,
    mutate: refetchCommentsAPI,
  } = useSWR<ICommentsList[], string>(
    [
      getEndpoint(APIEndpoints.GET_QUESTION_COMMENTS, questionData.id),
      token.token,
    ],
    fetcher
  );
  const refetchComments = () => {
    void refetchCommentsAPI();
  };
  const commentsList = commentsData?.slice().reverse();

  /* disclosure hook for replies drawer */
  const {
    isOpen: isRepliesOpen,
    onOpen: onRepliesOpen,
    onClose: onRepliesClose,
  } = useDisclosure();
  const [closeReplies, setCloseReplies] = useState(false);

  /* disclosure hook for error modal */
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  const repliesRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const reportRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const router = useRouter();

  /* state for if the user clicked on a comment */
  const [clickedComment, setClickedComment] = useState<
    ICommentsList | undefined
  >(undefined);

  /* state for when the user tries submitting a comment */
  const [commentSubmitted, setCommentSubmitted] = useState<ICommentSubmitted>({
    submit: false,
    success: false,
  });

  //const [commentsList, setCommentsList] = useState(data);
  const toast = useToast();

  if (clickedComment && !isRepliesOpen) {
    /* open the replies drawer if you click on a reply */
    onRepliesOpen();
  }

  if (commentSubmitted.submit) {
    /* comment tried to submit */
    if (commentSubmitted.success) {
      /* comment was successful in submitting */
      /* the reason you are fetching again is to avoid UI discrepancies due to the parent components */
      /* not updating. I recommend working and trying to find a simpler solution if time permits */
      fetchQuestionComments(token.token, questionData.id)
        .then((v) => {
          if (isRepliesOpen && clickedComment)
            /* if the replies drawer is open need to update the UI */
            setClickedComment(
              v.find((value) => value.id === clickedComment.id)
            );
          refetchComments();
          //setCommentsList(v);
        })
        .catch((err) => console.log(err));
    } else if (!commentSubmitted.success) {
      onErrorOpen();
    }

    setCommentSubmitted({ submit: false, success: false });
  }

  /* callback for submitting a user comment */
  const submitUserComment = (body: string) => {
    if (token) {
      submitComment({
        comment: { body: body, parentId: null },
        questionId: questionData.id,
        token: token.token,
      })
        .then((data) => {
          console.log(data);
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
  /* end of callback */

  /* callback for when a user has replied */
  const userReplySubmitted = ({ submit, success }: ICommentSubmitted) => {
    setCommentSubmitted({ submit: submit, success: success });
  };

  /* callback for deleting a user comment */
  const deleteUserComment = (comment: ICommentsList) => {
    deleteComment({
      comment: comment,
      questionId: questionData.id,
      token: token.token,
    })
      .then((data) => {
        console.log(data);
        fetchQuestionComments(token.token, questionData.id)
          .then((v) => {
            refetchComments();
            //setCommentsList(v);
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
  /* end of callback */

  /* callback for reporting a user comment */
  const reportUserComment = (comment: ICommentsList) => {
    reportComment({
      commentId: comment.id,
      questionId: questionData.id,
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
  /* end of callback */

  return (
    <DrawerContent height="70vh" borderTopRadius="25px" bg="grayscale.gray.300">
      <DrawerCloseButton size="lg" mr={2} mt={2} />
      <DrawerHeader mt={2} ml={2}>
        Comments
      </DrawerHeader>

      <DrawerBody>
        <HStack my={2}>
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
        {commentsList?.map((comment, index) => {
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
                        <Text
                          fontStyle="italic"
                          variant="overline"
                          color="brand.orange"
                        >
                          Responded:&nbsp;
                          {comment.userResponses.map(
                            (response, index) =>
                              `${
                                questionData.options.find(
                                  (v) => response === v.id
                                )?.body ?? ""
                              }${
                                index + 1 < comment.userResponses.length
                                  ? ", " /* iif multiple responses,  add a comma */
                                  : ""
                              }`
                          )}
                        </Text>
                        <Text variant="body">{comment.body}</Text>
                        <Likes
                          likes={comment.likes}
                          commentId={comment.id}
                          questionId={questionData.id}
                          refetchComments={refetchComments}
                        />
                      </VStack>
                      {isValidating ? (
                        <CircularProgress isIndeterminate size="20px" />
                      ) : (
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
                      )}
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
                    <MenuList bg="grayscale.gray.300">
                      <MenuItem _focus={{ bg: "rgba(255,255,255,0.08)" }}>
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

      <DrawerFooter></DrawerFooter>

      <Drawer
        isOpen={isRepliesOpen}
        placement="right"
        onClose={() => {
          setClickedComment(undefined);
          onRepliesClose();
        }}
        finalFocusRef={repliesRef}
        autoFocus={false}
      >
        <DrawerOverlay />
        <RepliesDrawer
          refreshComments={refetchComments}
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

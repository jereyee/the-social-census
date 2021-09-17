import { ArrowLeftIcon, ArrowUpIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Heading,
  VStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  HStack,
  Circle,
} from "@chakra-ui/react";
import Questions, { QuestionType } from "components/questions/Questions";
import Sections from "components/results/Sections";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import QuestionsContext from "utils/questionsContext";

const Result = () => {
  const router = useRouter();
  const { questionState, updateQuestionState } = useContext(QuestionsContext);
  console.log(questionState.response);

  return (
    <Box w="full">
      <br />
      <br />
      This is the results page
      <br />
      <br />
      <Sections commentsList={commentsList} />
      <br />
      <br />
      <Link
        href={{
          pathname: "/home",
        }}
        as="/home"
      >
        next
      </Link>
    </Box>
  );
};

export interface IReply {
  id: number;
  questionId: number;
  uid: string;
  parentId: number;
  body: string;
  createdAt: string;
  likes: number;
}

export interface ICommentsList {
  id: number;
  questionId: number;
  uid: string;
  parentId: null;
  body: string;
  createdAt: string;
  likes: number;
  children: IReply[];
}

const commentsList = [
  {
    id: 1,
    questionId: 3,
    uid: "KJXmu4CSW7ThOkwU5MRVPCC3xww2",
    parentId: null,
    body: "Hi everyone",
    createdAt: "2021-09-14T11:10:03.542Z",
    likes: 0,
    children: [
      {
        id: 11,
        questionId: 3,
        uid: "KJXmu4CSW7ThOkwU5MRVPCC3xww2",
        parentId: 1,
        body: "Hi everyone",
        createdAt: "2021-09-14T11:36:31.916Z",
        likes: 0,
      },
    ],
  },
  {
    id: 3,
    questionId: 3,
    uid: "KJXmu4CSW7ThOkwU5MRVPCC3xww2",
    parentId: null,
    body: "Hi everyone",
    createdAt: "2021-09-14T11:17:13.361Z",
    likes: 1,
    children: [
      {
        id: 6,
        questionId: 3,
        uid: "KJXmu4CSW7ThOkwU5MRVPCC3xww2",
        parentId: 3,
        body: "Hi everyone",
        createdAt: "2021-09-14T11:29:22.571Z",
        likes: 0,
      },
      {
        id: 7,
        questionId: 3,
        uid: "KJXmu4CSW7ThOkwU5MRVPCC3xww2",
        parentId: 3,
        body: "Hi everyone",
        createdAt: "2021-09-14T11:29:26.660Z",
        likes: 1,
      },
    ],
  },
];

export default Result;

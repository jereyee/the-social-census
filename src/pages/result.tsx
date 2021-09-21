import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import Poll from "components/results/charts/poll/Poll";
import DoughnutChart from "components/results/charts/Doughnut";
import Sections from "components/results/Sections";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useContext } from "react";
import QuestionsContext from "utils/questionsContext";
import BarScale from "components/results/charts/BarScale";
import WebShare from "utils/web-share/WebShare";

const Result = () => {
  const { questionState, updateQuestionState } = useContext(QuestionsContext);
  console.log(questionState.response);

  return (
    <Box w="full" pt={20}>
      <VStack spacing={10}>
        <Heading as="h2" variant="heading2" textAlign="center">
          {questionState.body}
        </Heading>
        <BarScale />
        <Box />
        <HStack>
          <WebShare questionId={questionState.id} buttonVariant="naked" />
          <Button variant="primary">
            <Link
              href={{
                pathname: "/home",
              }}
              as="/home"
            >
              Next
            </Link>
          </Button>
        </HStack>
      </VStack>
      <br />
      <br />
      <Sections commentsList={commentsList} />
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

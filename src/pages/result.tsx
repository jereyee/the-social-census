import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import Poll from "components/results/charts/poll/Poll";
import DoughnutChart from "components/results/charts/Doughnut";
import Sections from "components/results/Sections";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useContext } from "react";
import QuestionsContext from "utils/questionsContext";
import BarScale from "components/results/charts/BarScale";
import WebShare from "utils/web-share/WebShare";
import { useQuestionComments, useQuestionStatistics } from "utils/api/hooks";
import { QuestionType } from "components/questions/Questions";

const Result = () => {
  const { questionState } = useContext(QuestionsContext);
  const { fetchSuccess: statsSuccess, fetchedStatistics } =
    useQuestionStatistics({ questionId: 1 });
  const { fetchSuccess: commentsSuccess, fetchedComments: commentsList } =
    useQuestionComments({ questionId: questionState.id });

  console.log(questionState.response);

  const VisualizationChart = () => {
    if (questionState.type === QuestionType.BINARY) {
      return <Poll statistics={fetchedStatistics} />;
    } else if (questionState.type === QuestionType.SCALE) {
      return <BarScale statistics={fetchedStatistics} />;
    } else {
      return <DoughnutChart statistics={fetchedStatistics} />;
    }
  };

  return statsSuccess ? (
    <Box w="full" pt={20}>
      <VStack spacing={10}>
        <Heading as="h2" variant="heading2" textAlign="center">
          {questionState.body}
        </Heading>
        <VisualizationChart />
        <Box />
        <HStack>
          <WebShare
            questionId={questionState.id}
            buttonVariant="naked"
            title="Check out this question on Social Census!"
            body={`${questionState.body}`}
          />
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
      <Sections
        commentsList={commentsSuccess ? commentsList : undefined}
        knowMore={questionState.knowMore}
      />
    </Box>
  ) : (
    <Center w="100%" h="80vh">
      <Spinner />
    </Center>
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
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  responses: number[];
}

export interface ICommentsList {
  id: number;
  questionId: number;
  parentId: null;
  body: string;
  createdAt: string;
  likes: number;
  children: IReply[];
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  responses: number[];
}

export interface IUserComment {
  body: string;
  parentId: null | number;
}

/* const commentsList = [
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
]; */

export default Result;

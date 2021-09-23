import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
  useToast,
  VStack
} from "@chakra-ui/react";
import Header from "components/layout/menu/Header";
import { QuestionType } from "components/questions/Questions";
import BarScale from "components/results/charts/BarScale";
import DoughnutChart from "components/results/charts/Doughnut";
import Poll from "components/results/charts/poll/Poll";
import { IOptionStats } from "components/results/charts/poll/PollOption";
import Sections from "components/results/Sections";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import nookies from "nookies";
import React, { useContext, useState } from "react";
import useSWR from "swr";
import { APIEndpoints, getEndpoint } from "utils/api/functions";
import { fetcher } from "utils/api/GET";
import QuestionsContext from "utils/questionsContext";
import WebShare from "utils/web-share/WebShare";
import { IQuestion } from "./home";

const Result = () => {
  const { questionState } = useContext(QuestionsContext);
  const [connectionOnline, setConnectionOnline] = useState(true);

  const router = useRouter();

  const questionId = router.query.qid
    ? parseInt(router.query.qid as string)
    : questionState.id;

  const token = nookies.get(undefined, "token");

  const { data: questionData, error } = useSWR<IQuestion, string>(
    [getEndpoint(APIEndpoints.GET_QUESTION, questionId), token.token],
    fetcher
  );

  const { data: fetchedStatistics } = useSWR<IOptionStats[], string>(
    [
      getEndpoint(APIEndpoints.GET_QUESTION_STATISTICS, questionId),
      token.token,
    ],
    fetcher
  );

  const { data: commentsData, mutate: mutateCommentAPI } = useSWR<
    ICommentsList[],
    string
  >(
    [getEndpoint(APIEndpoints.GET_QUESTION_COMMENTS, questionId), token.token],
    fetcher
  );
  const refreshComments = () => {
    void mutateCommentAPI();
  };
  const commentsList = commentsData?.slice().reverse();

  const VisualizationChart = () => {
    if (!fetchedStatistics || !questionData) return <></>;

    if (questionData.type === QuestionType.BINARY) {
      return <Poll statistics={fetchedStatistics} />;
    } else if (questionData.type === QuestionType.SCALE) {
      return <BarScale statistics={fetchedStatistics} />;
    } else {
      return <DoughnutChart statistics={fetchedStatistics} />;
    }
  };

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const toast = useToast();

  if (!connectionOnline) {
    toast.closeAll();
    toast({
      title: `Currently offline. The results here might not be the latest 😕`,
      status: "error",
      position: "top-right",
      duration: 15000,
      isClosable: true,
    });
  }

  if (typeof window !== "undefined") {
    if (!window.navigator.onLine) {
      setConnectionOnline(false);
    } else if (!connectionOnline && window.navigator.onLine) {
      toast.closeAll();
      toast({
        title: `Connection seems to be back 😄`,
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    }
  }

  return (
    <Box>
      <Header headerText="The Social Census" />
      {fetchedStatistics && questionData ? (
        <Box w="full" pt={20}>
          <VStack spacing={10}>
            <Heading as="h2" variant="heading2" textAlign="center">
              {questionData.body}
            </Heading>
            <VisualizationChart />
            <Box />
            <HStack>
              <WebShare
                questionId={questionId}
                buttonVariant="naked"
                title="Check out this question on Social Census!"
                body={`${questionData.body}`}
                url={`${origin}/question?id=${questionId}`}
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
            commentsList={commentsList ?? undefined}
            knowMore={questionData.knowMore}
            refreshComments={refreshComments}
            questionData={questionData}
          />
        </Box>
      ) : (
        <Center w="100%" h="80vh">
          <Spinner />
        </Center>
      )}
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
  userResponses: number[];
}

export interface IUserComment {
  body: string;
  parentId: null | number;
}

export default Result;

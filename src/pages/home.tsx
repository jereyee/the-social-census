import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import Questions, { QuestionType } from "components/questions/Questions";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import QuestionsContext from "utils/questionsContext";
import nookies from "nookies";

import { GetServerSideProps } from "next";
import axios from "axios";
import { getAuth } from "@firebase/auth";
import { useAuth } from "utils/auth/AuthProvider";
import { useQuestionsFetcher } from "utils/api/hooks";
import { submitQuestion } from "utils/api/POST";

const Home = () => {
  const token = nookies.get(undefined, "token");
  const { user } = useAuth();
  console.log(user?.displayName);

  const { fetchSuccess, fetchedQuestions: questionsList } =
    useQuestionsFetcher();

  const router = useRouter();

  const { questionState, updateQuestionState } = useContext(QuestionsContext);

  const [questionIndex, setQuestionIndex] = useState(questionState.lastIndex);

  if (
    questionIndex === questionsList.length &&
    fetchSuccess &&
    questionIndex !== 0
  )
    setQuestionIndex(0);

  const changeQuestion = (index: number) => {
    updateQuestionState({ ...questionState, lastIndex: index });
    setQuestionIndex(index);
  };

  const answerQuestion = (response: number[]) => {
    updateQuestionState({
      ...questionState,
      lastIndex: questionIndex + 1,
      response: response,
      ...questionsList[questionIndex],
    });

    submitQuestion({
      questionId: questionState.id,
      responses: response,
      token: token.token,
    })
      .then((data) => {
        console.log(data);
        //push success
        void router.push(
          {
            pathname: "/result",
          },
          "/result"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const questionsComponents = fetchSuccess
    ? questionsList.map((question, index) => (
        <Questions
          key={index}
          questionIndex={index}
          questionData={question}
          changeQuestion={changeQuestion}
          answerQuestion={answerQuestion}
        />
      ))
    : [];

  return fetchSuccess ? (
    questionsList.length > 0 ? (
      <Box w="full">{questionsComponents[questionIndex]}</Box>
    ) : (
      <Center h="80vh">
        <Heading as="h3" variant="heading3">
          {" "}
          No questions to show ☹
        </Heading>
      </Center>
    )
  ) : (
    <Center w="100%" h="80vh">
      <Spinner />
    </Center>
  );
};

export default Home;

export interface IQuestion {
  id: number;
  body: string;
  category: string;
  type: QuestionType;
  knowMore: Record<string, unknown>;
  createdAt: string;
  options: {
    id: number;
    questionId: number;
    body: string;
  }[];
}

/* const questionList = [
  {
    id: 1,
    body: "Would you marry someone from a different race?",
    category: "race",
    type: QuestionType.BINARY,
    knowMore: {},
    createdAt: "2021-09-12T12:53:54.937Z",
    options: [
      {
        id: 0,
        questionId: 1,
        body: "Yes",
      },
      {
        id: 1,
        questionId: 1,
        body: "No",
      },
    ],
  },
  {
    id: 2,
    body: "My personal aspirations are held back by my financial situation.",
    category: "finance",
    type: QuestionType.SCALE,
    knowMore: {},
    createdAt: "2021-09-12T12:53:54.991Z",
    options: [
      {
        id: 0,
        questionId: 2,
        body: "1",
      },
      {
        id: 1,
        questionId: 2,
        body: "2",
      },
      {
        id: 2,
        questionId: 2,
        body: "3",
      },
      {
        id: 3,
        questionId: 2,
        body: "4",
      },
      {
        id: 4,
        questionId: 2,
        body: "5",
      },
    ],
  },
  {
    id: 3,
    body: "Have you ever felt discriminated for any of these areas?",
    category: "discrimination",
    type: QuestionType.MULTIPLE_RESPONSE,
    knowMore: {},
    createdAt: "2021-09-12T12:53:54.991Z",
    options: [
      {
        id: 0,
        questionId: 2,
        body: "Race",
      },
      {
        id: 1,
        questionId: 2,
        body: "Religion",
      },
      {
        id: 2,
        questionId: 2,
        body: "Gender",
      },
      {
        id: 3,
        questionId: 2,
        body: "Sexuality",
      },
      {
        id: 4,
        questionId: 2,
        body: "Disability",
      },
      {
        id: 5,
        questionId: 2,
        body: "None",
      },
    ],
  },
  {
    id: 4,
    body: "HAVE YOU EVER FELT DISCRIMINATED FOR ANY OF THESE AREAS??",
    category: "discrimination",
    type: QuestionType.MULTIPLE_CHOICE,
    knowMore: {},
    createdAt: "2021-09-12T12:53:54.991Z",
    options: [
      {
        id: 0,
        questionId: 2,
        body: "Race",
      },
      {
        id: 1,
        questionId: 2,
        body: "Religion",
      },
      {
        id: 2,
        questionId: 2,
        body: "Gender",
      },
      {
        id: 3,
        questionId: 2,
        body: "Sexuality",
      },
      {
        id: 4,
        questionId: 2,
        body: "Disability",
      },
      {
        id: 5,
        questionId: 2,
        body: "None",
      },
    ],
  },
];
 */

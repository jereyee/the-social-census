import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import Header from "components/layout/menu/Header";
import Questions, { QuestionType } from "components/questions/Questions";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { APIEndpoints, getEndpoint } from "utils/api/functions";
import { fetcher } from "utils/api/GET";
import { submitQuestion } from "utils/api/POST";
import QuestionsContext from "utils/questionsContext";

const Home = () => {
  const token = nookies.get(undefined, "token");
  const { data: questionsList, error } = useSWR<IQuestion[], string>(
    [getEndpoint(APIEndpoints.LIST_QUESTIONS), token.token],
    fetcher
  );

  const router = useRouter();

  const { questionState, updateQuestionState } = useContext(QuestionsContext);

  const [questionIndex, setQuestionIndex] = useState(questionState.lastIndex);

  useEffect(() => {
    /* update the global question the moment the questions list */
    /* has been retrieved from the api */
    updateQuestionState({
      ...questionState,
      shared: false,
      ...(questionsList && questionsList[questionIndex]),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsList]);

  if (
    !error &&
    questionsList &&
    questionIndex === questionsList.length &&
    questionIndex !== 0
  )
    setQuestionIndex(0);

  const changeQuestion = (index: number) => {
    updateQuestionState({
      ...questionState,
      lastIndex: index,
      shared: false,
      ...(questionsList && questionsList[index]),
    });
    setQuestionIndex(index);
  };

  const answerQuestion = (response: number[]) => {
    updateQuestionState({
      ...questionState,
      lastIndex: questionIndex + 1,
      response: response,
      shared: false,
      ...(questionsList && questionsList[questionIndex]),
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

  const questionsComponents = questionsList
    ? questionsList.map((question, index) => (
        <Questions
          key={index}
          questionIndex={questionState.shared ? index + 1 : index}
          questionData={question}
          changeQuestion={changeQuestion}
          answerQuestion={answerQuestion}
        />
      ))
    : [];

  /* put the shared question as the first of the list */
  if (questionState.shared)
    questionsComponents.unshift(
      <Questions
        questionIndex={0}
        questionData={questionState}
        changeQuestion={changeQuestion}
        answerQuestion={answerQuestion}
      />
    );

  return (
    <Box>
      <Header headerText="The Social Census" />

      {questionsList ? (
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
      )}
    </Box>
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

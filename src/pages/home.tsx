import { Box } from "@chakra-ui/react";
import Questions, { QuestionType } from "components/questions/Questions";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import QuestionsContext from "utils/questionsContext";

const Home = () => {
  const router = useRouter();

  const { questionState, updateQuestionState } = useContext(QuestionsContext);

  const [questionIndex, setQuestionIndex] = useState(questionState.lastIndex);

  if (questionIndex === questionList.length) setQuestionIndex(0);

  const changeQuestion = (index: number) => {
    updateQuestionState({ ...questionState, lastIndex: index });
    setQuestionIndex(index);
  };

  const answerQuestion = (response: number[]) => {
    const questionData = {
      questionId: questionList[questionIndex].id,
      knowMore: questionList[questionIndex].knowMore,
    };
    updateQuestionState({
      ...questionState,
      lastIndex: questionIndex + 1,
      response: response,
      ...questionData,
    });
    void router.push(
      {
        pathname: "/result",
      },
      "/result"
    );
  };

  const questionsComponents = questionList.map((question, index) => (
    <Questions
      key={index}
      questionIndex={index}
      questionData={question}
      changeQuestion={changeQuestion}
      answerQuestion={answerQuestion}
    />
  ));

  return <Box w="full">{questionsComponents[questionIndex]}</Box>;
};

export default Home;

const questionList = [
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

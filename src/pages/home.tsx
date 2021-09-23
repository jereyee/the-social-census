import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { getAnalytics } from "@firebase/analytics";
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

  /* set and check the last index that was answered */
  const { questionState, updateQuestionState } = useContext(QuestionsContext);
  const [questionIndex, setQuestionIndex] = useState(questionState.lastIndex);

  if (process.env.NODE_ENV === "production") {
    const analytics = getAnalytics();
  }

  useEffect(() => {
    /* if it's a shared question, dont need to update */
    if (questionState.shared) return;

    /* update the global question the moment the questions list */
    /* has been retrieved from the api */
    updateQuestionState({
      ...questionState,
      shared: false,
      /* add the current indexed question to the questionState */
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

  // console.log({questionState});

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
  if (questionState.shared) {
    questionsComponents.unshift(
      <Questions
        questionIndex={0}
        questionData={questionState}
        changeQuestion={changeQuestion}
        answerQuestion={answerQuestion}
      />
    );
  }

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

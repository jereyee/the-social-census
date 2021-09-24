import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import Header from "components/layout/menu/Header";
import Questions from "components/questions/Questions";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { IQuestion } from "types/shared";
import { APIEndpoints, getEndpoint } from "utils/api/functions";
import { fetcher } from "utils/api/GET";
import { submitQuestion } from "utils/api/POST";
import QuestionsContext from "utils/questionsContext";

const Home = () => {
  const token = nookies.get(undefined, "token");

  const { data: fetchedQuestions, error } = useSWR<IQuestion[], string>(
    [getEndpoint(APIEndpoints.LIST_QUESTIONS), token.token],
    fetcher,
    {
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      onSuccess: () => {
        localStorage.setItem("questions", JSON.stringify(fetchedQuestions));
      },
    }
  );

  const [questionsList, setQuestionsList] = useState<IQuestion[]>();

  const router = useRouter();

  /* set and check the last index that was answered */
  const { questionState, updateQuestionState } = useContext(QuestionsContext);
  const [questionIndex, setQuestionIndex] = useState(questionState.lastIndex);

  useEffect(() => {
    /* if it's a shared question, dont need to update */
    if (questionState.shared) return;
    /* if questionlist is already in local storage, set these as the questions */
    const localStorageQuestions = localStorage.getItem("questions");
    const localStorageIndex = localStorage.getItem("questionIndex");
    const questions: IQuestion[] | false =
      localStorageQuestions !== "" &&
      localStorageQuestions !== null &&
      localStorageQuestions !== "undefined" &&
      (JSON.parse(localStorageQuestions) as IQuestion[]);

    if (questions) {
      setQuestionsList(questions);
      if (
        localStorageIndex !== "" &&
        localStorageIndex !== null &&
        localStorageIndex !== "undefined"
      )
        setQuestionIndex(parseInt(localStorageIndex));
      return;
    }

    /* update the global question the moment the questions list */
    /* has been retrieved from the api */
    updateQuestionState({
      ...questionState,
      shared: false,
      /* add the current indexed question to the questionState */
      ...(questionsList && questionsList[questionIndex]),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedQuestions]);

  useEffect(() => {
    /* update local storage index */
    localStorage.setItem("questionIndex", questionIndex.toString());
  }, [questionIndex]);

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
    if (!questionsList) return;
    /* update local storage index to keep track */
    localStorage.setItem("questionIndex", (questionIndex + 1).toString());

    updateQuestionState({
      ...questionState,
      lastIndex: questionIndex + 1,
      response: response,
      shared: false,
      ...(questionsList && questionsList[questionIndex]),
    });

    submitQuestion({
      questionId: questionsList[questionIndex].id,
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

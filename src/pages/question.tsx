import { Button, Center, Text, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "utils/auth/AuthProvider";
import QuestionsContext from "utils/questionsContext";
import nookies from "nookies";
import useSWR from "swr";
import { getEndpoint, APIEndpoints } from "utils/api/functions";
import { fetcher } from "utils/api/GET";
import { IQuestionData, IResponse } from "types/shared";
import { trackEvent } from "utils/analytics";

const Question = () => {
  const { user } = useAuth();
  const { questionState, updateQuestionState } = useContext(QuestionsContext);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToResults, setRedirectToResults] = useState(false);
  const [textToShow, setTextToShow] = useState(<Text>Redirecting...</Text>);

  const router = useRouter();

  const query = router.query;

  const token = nookies.get(undefined, "token");

  const toast = useToast();

  const { data: questionData, error } = useSWR<IQuestionData, Error>(
    [
      getEndpoint(APIEndpoints.GET_QUESTION, parseInt(query.id as string)),
      token.token,
    ],
    fetcher
  );

  const { data: responses } = useSWR<IResponse[], string>(
    [getEndpoint(APIEndpoints.GET_USER_RESPONSES), token.token],
    fetcher
  );

  useEffect(() => {
    console.log("user: ", user);
    if (redirectToHome || redirectToLogin || !responses || redirectToResults)
      return;

    if (questionData && user) {
      /* check if user alr has answered the question */
      const alreadyAnswered = !!responses.find(
        (response) => response.questionId === questionData.id
      );
      if (alreadyAnswered) setRedirectToResults(true);

      updateQuestionState({
        ...questionState,
        lastIndex: 0,
        shared: true,
        ...questionData,
      });
      //http://localhost:3000/question?id=2
      console.log("Redirecting to home...");
      setRedirectToHome(true);
    } else if (!questionData && user && error) {
      setTextToShow(
        <VStack spacing={8}>
          <Text textAlign="center">
            Something went wrong ☹<br />
            Are you sure it&apos;s the correct URL?
          </Text>
          <Button variant="primary">
            <Link href="/home">Take me to another question</Link>
          </Button>
        </VStack>
      );
    } else if (!questionData && !user && error) {
      console.log("Redirecting to login...");
      setRedirectToLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, questionData, responses]);

  if (redirectToHome) {
    /* double check to make sure that the questions are the same */
    if (questionData && questionState.id === questionData.id) {
      void router.push(
        { pathname: "/home", query: { shared: "yes" } },
        "/home"
      );
    } else {
      setRedirectToLogin(true);
    }
  }

  if (redirectToLogin) {
    toast.closeAll();
    toast({
      title: error?.message.includes("403")
        ? "User not authorized"
        : error?.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    void router.push("/login");
  }

  if (redirectToResults) {
    toast.closeAll();
    toast({
      title: "You've answered this question already",
      status: "warning",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
    if (questionData)
      void router.push(
        {
          pathname: "/result",
          query: {
            qid: questionData.id.toString(),
          },
        },
        "/result"
      );
  }

  return (
    <Center w="100%" h="80vh">
      {textToShow}
    </Center>
  );
};

export default Question;

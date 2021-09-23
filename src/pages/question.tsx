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
import { IQuestion } from "./home";
import { IQuestionData } from "components/questions/Questions";

const Question = () => {
  const { user } = useAuth();
  const { questionState, updateQuestionState } = useContext(QuestionsContext);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
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

  useEffect(() => {
    console.log("user: ", user);
    if (redirectToHome || redirectToLogin) return;

    if (questionData && user) {
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
  }, [user, questionData]);

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

  return (
    <Center w="100%" h="80vh">
      {textToShow}
    </Center>
  );
};

export default Question;

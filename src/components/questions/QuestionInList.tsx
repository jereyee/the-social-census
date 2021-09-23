import {
  Center,
  Divider,
  Flex,
  Skeleton,
  Spacer,
  Switch,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import { MotionVStack } from "components/motion";
import { useRouter } from "next/dist/client/router";
import { IQuestionInList } from "pages/responses";
import React from "react";
import { themeColors } from "styles/colors";
import useSWR from "swr";
import { getEndpoint, APIEndpoints } from "utils/api/functions";
import { fetcher } from "utils/api/GET";
import { excludeOrUnexcludeQuestions } from "utils/api/POST";
import nookies from "nookies";
import { IQuestion } from "types/shared";

const QuestionInList = ({ question }: { question: IQuestionInList }) => {
  const token = nookies.get(undefined, "token");

  const { data: questionData, error } = useSWR<IQuestion, string>(
    [getEndpoint(APIEndpoints.GET_QUESTION, question.questionId), token.token],
    fetcher
  );
  // const { fetchedQuestion, fetchSuccess } = useQuestion(response.questionId);

  const router = useRouter();
  const redirectToResult = () => {
    questionData &&
      void router.push(
        {
          pathname: "/result",
          query: { qid: questionData.id },
        },
        "/result"
      );
  };

  const toast = useToast();

  return (
    <Skeleton isLoaded={!!(!error && questionData)} speed={1.2} w="100%">
      <VStack width="100%" spacing={4} mt={4}>
        <Flex h="48px" alignItems="center" w="100%">
          <MotionVStack
            alignItems="flex-start"
            onClick={redirectToResult}
            _hover={{
              bg: themeColors.grayscale.gray[300],
              cursor: "pointer",
            }}
            whileTap={{ scale: 1.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <Text as="p" variant="body" maxWidth="30ch" noOfLines={2}>
              {questionData?.body}
            </Text>
          </MotionVStack>
          <Spacer />
          <Center width="90px">
            <Switch
              colorScheme="purple"
              className="exclude"
              size="lg"
              defaultChecked={question.excluded}
              onChange={(ev) => {
                const exclude = ev.target.checked;
                excludeOrUnexcludeQuestions({
                  exclude: exclude,
                  questionId: question.questionId,
                  token: token.token,
                })
                  .then((data) => {
                    console.log(data);
                    toast({
                      title: `Exclusion ${exclude ? "added" : "removed"}!`,
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                    ev.target.checked = !ev.target.checked;
                  })
                  .catch((error) => {
                    console.log(error);
                    toast({
                      title: `Failed to ${
                        exclude ? "add" : "remove"
                      } exclusion.`,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  });
              }}
            />
          </Center>
        </Flex>
        <Divider />
      </VStack>
    </Skeleton>
  );
};

export default QuestionInList;

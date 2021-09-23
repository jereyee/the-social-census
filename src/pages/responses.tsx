import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Spinner,
  Switch,
  useToast,
} from "@chakra-ui/react";
import Header from "components/layout/menu/Header";
import { MotionVStack } from "components/motion";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import React from "react";
import { themeColors } from "styles/colors";
import useSWR from "swr";
import { APIEndpoints, getEndpoint } from "utils/api/functions";
import { fetcher, IExclusion, IResponse } from "utils/api/GET";
import { excludeOrUnexcludeQuestions } from "utils/api/POST";
import { IQuestion } from "./home";

const Question = ({ question }: { question: IQuestionInList }) => {
  const token = nookies.get(undefined, "token");

  const { data: questionData, error } = useSWR<IQuestion, string>(
    [getEndpoint(APIEndpoints.GET_QUESTION, question.questionId), token.token],
    fetcher,
    {
      dedupingInterval: 5000,
    }
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

interface IQuestionInList extends IResponse {
  excluded?: boolean;
}

const Responses = () => {
  //const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const token = nookies.get(undefined, "token");
  const { data: responses, error } = useSWR<IResponse[], string>(
    [getEndpoint(APIEndpoints.GET_USER_RESPONSES), token.token],
    fetcher
  );

  const { data: exclusionList, error: exclusionError } = useSWR<
    IExclusion[],
    string
  >([getEndpoint(APIEndpoints.LIST_MATCH_EXCLUSIONS), token.token], fetcher);

  const responsesWithoutDuplicates: IQuestionInList[] | undefined =
    responses?.filter((response) =>
      responses.find((v) => v.questionId === response.questionId)
    );

  responsesWithoutDuplicates?.forEach((v) => {
    v.excluded = !!exclusionList?.find((i) => i.questionId === v.questionId);
  });

  console.log(exclusionList);
  return exclusionList && !exclusionError ? (
    <Box>
      {/* match responses header */}
      <Header headerText="Questions You've Answered" />

      {/* content */}
      <Flex my={6}>
        <Spacer />
        <Spacer />
        <HStack>
          <Heading as="h3" variant="body" textAlign="center">
            Exclude
          </Heading>
          <Popover id="tooltip">
            <PopoverTrigger>
              <QuestionOutlineIcon
                _active={{ color: "brand.magenta" }}
                _hover={{ color: "brand.magenta" }}
              />
            </PopoverTrigger>
            <PopoverContent bg="grayscale.gray.300">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                Toggle this button if you want to exclude the questions from
                your matches.
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </HStack>
      </Flex>
      {responsesWithoutDuplicates &&
        responsesWithoutDuplicates.map((response, index) => (
          <Question key={index} question={response} />
        ))}
    </Box>
  ) : (
    <Center w="100%" h="80vh">
      <Spinner />
    </Center>
  );
};

export default Responses;

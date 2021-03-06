import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Heading, HStack, Spacer } from "@chakra-ui/layout";
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner
} from "@chakra-ui/react";
import Header from "components/layout/menu/Header";
import QuestionInList from "components/questions/QuestionInList";
import nookies from "nookies";
import React from "react";
import useSWR from "swr";
import { IExclusion, IResponse } from "types/shared";
import { APIEndpoints, getEndpoint } from "utils/api/functions";
import { fetcher } from "utils/api/GET";

export interface IQuestionInList extends IResponse {
  excluded?: boolean;
}
const Responses = () => {
  //const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const token = nookies.get(undefined, "token");
  const { data: responses } = useSWR<IResponse[], string>(
    [getEndpoint(APIEndpoints.GET_USER_RESPONSES), token.token],
    fetcher
  );

  const {
    data: exclusionList,
    error: exclusionError,
    mutate: refreshExclusions,
  } = useSWR<IExclusion[], string>(
    [getEndpoint(APIEndpoints.LIST_MATCH_EXCLUSIONS), token.token],
    fetcher
  );

  const responsesWithoutDuplicates: IQuestionInList[] | undefined =
    responses?.filter((response) =>
      responses.find((v) => v.questionId === response.questionId)
    );

  responsesWithoutDuplicates?.forEach((v) => {
    v.excluded = !!exclusionList?.find((i) => i.questionId === v.questionId);
  });

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
          <QuestionInList
            key={index}
            question={response}
            refreshExclusions={refreshExclusions}
          />
        ))}
    </Box>
  ) : (
    <Center w="100%" h="80vh">
      <Spinner />
    </Center>
  );
};

export default Responses;

import { HStack, VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { IOptionData } from "components/questions/Questions";
import React from "react";
import PollOption, { IOptionStats } from "./PollOption";

export interface IBinary {
  options?: IOptionData[];
  selectedOptions?: number[];
}

const datasets = [
  {
    id: 0,
    questionId: 0,
    body: "Yes",
    responses: 7,
  },
  {
    id: 1,
    questionId: 0,
    body: "No",
    responses: 3,
  },
];

const Poll = ({
  options = [
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
  selectedOptions = [1],
}: IBinary) => {
  const reducer = (previous: number, current: IOptionStats) =>
    previous + current.responses;
  const totalResponses = datasets.reduce(reducer, 0);
  const statistics = datasets.map((option, index) => {
    return { ...option, percent: (option.responses / totalResponses) * 100 };
  });

  return (
    <VStack w="100%" spacing={4}>
      <Text color="grayscale.gray.100">{totalResponses} responses</Text>
      <HStack
        spacing={0}
        w="100%"
        bg="linear-gradient(90deg, rgba(248,167,85,1) 0%, rgba(255,86,104,1) 100%)"
        borderRadius="20px"
      >
        {options.map((option, index) => {
          const optionData = statistics.find((v) => v.id === option.id);
          return optionData ? (
            <PollOption key={index} index={index} optionData={optionData} />
          ) : (
            <></>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default Poll;

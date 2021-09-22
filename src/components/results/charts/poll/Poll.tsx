import { HStack, VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { IOptionData } from "components/questions/Questions";
import React from "react";
import PollOption, { IOptionStats } from "./PollOption";

export interface IPollStatistics extends IOptionData {
  responses: number;
}

export interface IBinary {
  statistics: IOptionStats[];
  selectedOptions?: number[];
}

const Poll = ({ statistics, selectedOptions = [1] }: IBinary) => {
  const reducer = (previous: number, current: IOptionStats) =>
    previous + current.responses;
  const totalResponses = statistics.reduce(reducer, 0);
  const stats = statistics.map((option) => {
    return { ...option, percent: (option.responses / totalResponses) * 100 };
  });

  return (
    <VStack w="100%" spacing={4}>
      <Text color="grayscale.gray.100">
        {totalResponses} {totalResponses > 1 ? "responses" : "response"}
      </Text>
      <HStack
        spacing={0}
        w="100%"
        bg="linear-gradient(90deg, rgba(248,167,85,1) 0%, rgba(255,86,104,1) 100%)"
        borderRadius="20px"
      >
        {statistics.map((option, index) => {
          const optionData = stats.find((v) => v.id === option.id);
          /* need to check if response is more than 0 to show */
          const responsesExist =
            optionData?.responses && optionData.responses > 0;
          return responsesExist ? (
            <PollOption
              key={index}
              index={index}
              optionData={optionData}
              buttonProps={{
                borderRadius:
                  optionData.percent === 100 ? "4.53px !important" : "initial",
              }}
            />
          ) : (
            <React.Fragment key={index}></React.Fragment>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default Poll;

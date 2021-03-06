import { Button } from "@chakra-ui/button";
import { Center, Heading, VStack } from "@chakra-ui/layout";
import Card from "components/micro/Card";
import React, { useEffect, useRef, useState } from "react";
import { themeColors } from "styles/colors";
import { IQuestionData } from "types/shared";
import { trackEvent } from "utils/analytics";
import Binary from "./questionTypes/binary/Binary";
import MultipleResponse from "./questionTypes/multipleResponse/MultipleResponse";
import Scale from "./questionTypes/scale/Scale";

const Questions = ({
  questionData,
  questionIndex,
  changeQuestion,
  answerQuestion,
}: {
  questionData: IQuestionData;
  questionIndex: number;
  changeQuestion: (index: number) => void;
  answerQuestion: (response: number[]) => void;
}) => {
  const [response, setResponse] = useState<number[]>([]);

  const brandColors = Object.values(themeColors.brand);

  /* bg color for the options that persist throughout the component */
  const cardBgColor = useRef("");
  useEffect(() => {
    cardBgColor.current =
      brandColors[Math.floor(Math.random() * brandColors.length)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(response);

  const selectResponse = (selectedOption: number) => {
    setResponse([...response, selectedOption]);
  };

  const removeResponse = (selectedOption: number) => {
    setResponse((arr) => arr.filter((item) => item !== selectedOption));
  };

  if (questionData.type === "SCALE" && response.length === 0) setResponse([2]);

  const questionTypes = {
    BINARY: (
      <Binary
        options={questionData.options}
        selectResponse={selectResponse}
        selectedOptions={response}
      />
    ),
    MULTIPLE_RESPONSE: (
      <MultipleResponse
        options={questionData.options}
        selectResponse={selectResponse}
        removeResponse={removeResponse}
        selectedOptions={response}
        multipleChoice={false}
        cardBgColor={cardBgColor.current}
      />
    ),
    MULTIPLE_CHOICE: (
      <MultipleResponse
        options={questionData.options}
        selectResponse={selectResponse}
        removeResponse={removeResponse}
        selectedOptions={response}
        multipleChoice={true}
        cardBgColor={cardBgColor.current}
      />
    ),
    SCALE: <Scale selectResponse={selectResponse} selectedOptions={response} />,
  };

  const Options = () => questionTypes[questionData.type];

  return (
    <Center w="100%" h="calc(100vh - 86px)" pt="10%" flexDirection="column">
      <VStack h="100%" justifyContent="space-evenly">
        <VStack spacing={6} justifyContent="flex-end">
          {questionData.type === "SCALE" ? (
            <VStack spacing={6} mb={4}>
              <Heading as="h2" variant="heading2" textAlign="center">
                How much do you relate with the following statement?
              </Heading>
              <Card bg="grayscale.gray.300" py={6}>
                <Heading as="h3" variant="heading3" textAlign="center">
                  {questionData.body}
                </Heading>
              </Card>
            </VStack>
          ) : (
            <Heading as="h2" variant="heading2" textAlign="center">
              {questionData.body}
            </Heading>
          )}

          <Options />
        </VStack>
        <Button
          variant="primary"
          isDisabled={response.length === 0}
          onClick={() => {
            trackEvent("answer_question", {
              id: questionData.id,
              body: questionData.body,
            });
            answerQuestion(response);
          }}
        >
          Submit Answer
        </Button>
        <Button
          variant="naked"
          onClick={() => {
            trackEvent("skip_question", {
              id: questionData.id,
              body: questionData.body,
            });
            changeQuestion(questionIndex + 1);
          }}
        >
          skip question
        </Button>
      </VStack>
    </Center>
  );
};

export default Questions;

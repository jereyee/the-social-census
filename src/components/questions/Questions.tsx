import { Button } from "@chakra-ui/button";
import { Center, Heading, VStack } from "@chakra-ui/layout";
import Card from "components/micro/Card";
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import React, { useEffect, useRef, useState } from "react";
import { themeColors } from "styles/colors";
import Binary from "./questionTypes/binary/Binary";
import MultipleOption from "./questionTypes/multipleResponse/MultipleOption";
import MultipleResponse from "./questionTypes/multipleResponse/MultipleResponse";
import Scale from "./questionTypes/scale/Scale";

enum QuestionType {
  BINARY = "BINARY",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  MULTIPLE_RESPONSE = "MULTIPLE_RESPONSE",
  SCALE = "SCALE",
}

const Questions = () => {
  const [response, setResponse] = useState<number[]>([]);

  const brandColors = Object.values(themeColors.brand);

  /* bg color for the options that persist throughout the component */
  const cardBgColor = useRef("");
  useEffect(() => {
    cardBgColor.current =
      brandColors[Math.floor(Math.random() * brandColors.length)];
  }, []); 
  console.log(response);

  const selectResponse = (selectedOption: number) => {
    setResponse([...response, selectedOption]);
  };

  const removeResponse = (selectedOption: number) => {
    setResponse((arr) => arr.filter((item) => item !== selectedOption));
  };

  /* const questionData = {
    id: 1,
    body: "Would you marry someone from a different race?",
    category: "race",
    type: QuestionType.BINARY,
    knowMore: {},
    createdAt: "2021-09-12T12:53:54.937Z",
    options: [
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
  }; */

  /* const questionData = {
    id: 2,
    body: "My personal aspirations are held back by my financial situation.",
    category: "finance",
    type: QuestionType.SCALE,
    knowMore: {},
    createdAt: "2021-09-12T12:53:54.991Z",
    options: [
      {
        id: 0,
        questionId: 2,
        body: "1",
      },
      {
        id: 1,
        questionId: 2,
        body: "2",
      },
      {
        id: 2,
        questionId: 2,
        body: "3",
      },
      {
        id: 3,
        questionId: 2,
        body: "4",
      },
      {
        id: 4,
        questionId: 2,
        body: "5",
      },
    ],
  }; */

  const questionData = {
    id: 3,
    body: "Have you ever felt discriminated for any of these areas?",
    category: "discrimination",
    type: QuestionType.MULTIPLE_CHOICE,
    knowMore: {},
    createdAt: "2021-09-12T12:53:54.991Z",
    options: [
      {
        id: 0,
        questionId: 2,
        body: "Race",
      },
      {
        id: 1,
        questionId: 2,
        body: "Religion",
      },
      {
        id: 2,
        questionId: 2,
        body: "Gender",
      },
      {
        id: 3,
        questionId: 2,
        body: "Sexuality",
      },
      {
        id: 4,
        questionId: 2,
        body: "Disability",
      },
      {
        id: 5,
        questionId: 2,
        body: "None",
      },
    ],
  };

  if (questionData.type === "SCALE" && response.length === 0) setResponse([3]);

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
        <Button variant="primary" isDisabled={response.length === 0}>
          Submit Answer
        </Button>
        <Button variant="naked">skip question</Button>
      </VStack>
    </Center>
  );
};

export default Questions;

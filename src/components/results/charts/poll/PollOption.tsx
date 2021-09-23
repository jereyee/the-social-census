/* Single option component */

import { Button, ButtonProps } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";
import { IOptionStats } from "types/shared";

const PollOption = ({
  optionData,
  index,
  buttonProps,
}: {
  optionData: IOptionStats;
  index: number;
  buttonProps?: ButtonProps;
}) => {
  const optionSettings = [
    {
      color: "white",
      bgColor: "#F8A755",
      // bg: "linear-gradient(90deg, rgba(248,167,85,1) 90%, rgba(255,86,104,1) 100%)",
    },
    {
      color: "white",
      bgColor: "#FF5668",
      // bg: "linear-gradient(270deg, rgba(248,167,85,1) 0%, rgba(255,86,104,1) 10%)",
      /* flip the button */
      transform: "scaleX(-1)",
      /* flip the text back */
      sx: {
        "& p": {
          transform: "scaleX(-1)",
        },
      },
    },
  ];

  return (
    <Button
      variant="poll"
      {...optionSettings[index]}
      w={`${optionData.percent ?? 50}%`}
      py={8}
      {...buttonProps}
    >
      <VStack spacing={1}>
        <Text textAlign="center">{optionData.body}</Text>
        <Text fontSize="20px" textAlign="center">
          {Math.floor(optionData.percent ?? 50)}%
        </Text>
      </VStack>
    </Button>
  );
};

export default PollOption;

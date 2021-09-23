/* Single option component */

import { Text } from "@chakra-ui/layout";
import Card from "components/micro/Card";
import React from "react";
import { IOptionData } from "types/shared";

const MultipleOption = ({
  selectOption,
  optionData,
  isSelected,
  cardBgColor,
}: {
  selectOption: (optionValue: number) => void;
  optionData: IOptionData;
  index: number;
  isSelected: boolean;
  cardBgColor: string;
}) => {
  return (
    <Card
      textAlign="center"
      py={7}
      bg={isSelected ? cardBgColor : "grayscale.gray.300"}
      as="button"
      onClick={() => {
        selectOption(optionData.id);
      }}
    >
      <Text maxW="90%" margin="0 auto">
        {optionData.body}
      </Text>
    </Card>
  );
};

export default MultipleOption;

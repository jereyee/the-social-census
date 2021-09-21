/* Single option component */

import Card from "components/micro/Card";
import { IOptionData } from "components/questions/Questions";
import React from "react";
import { themeColors } from "styles/colors";

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
      <p>{optionData.body}</p>
    </Card>
  );
};

export default MultipleOption;
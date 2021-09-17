import { Button } from "@chakra-ui/button";
import { Divider, HStack, SimpleGrid } from "@chakra-ui/layout";
import { IOptionData } from "components/questions/Questions";
import React from "react";
import { themeColors } from "styles/colors";
import MultipleOption from "./MultipleOption";

export interface IMultipleResponse {
  options: IOptionData[];
  selectResponse: (selectedOptions: number) => void;
  removeResponse: (selectedOptions: number) => void;
  selectedOptions: number[];
  multipleChoice: boolean;
  cardBgColor: string;
}

const MultipleResponse = ({
  options,
  selectedOptions,
  selectResponse,
  removeResponse,
  multipleChoice,
  cardBgColor,
}: IMultipleResponse) => {
  const selectOption = (optionValue: number) => {
    const noneOption = options.find((option) => option.body === "None");
    if (
      /* selected option already in array */
      selectedOptions.includes(optionValue)
    ) {
      removeResponse(optionValue);
      return;
    }

    if (
      !multipleChoice &&
      /* if other options are already selected and trying to select none */
      ((selectedOptions.length > 0 && optionValue == noneOption?.id) ||
        /* if none is already selected and trying to select other none options */
        (noneOption && selectedOptions.includes(noneOption?.id)))
    ) {
      return;
    }

    if (multipleChoice && selectedOptions.length > 0) {
      /* if it's a multiple choice (can't select other options) */
      selectedOptions.length = 0;
    }

    selectResponse(optionValue);
  };

  return (
    <SimpleGrid columns={2} w="100%" spacingX={4} spacingY={4}>
      {options.map((option, index) => {
        const isSelected = selectedOptions.includes(option.id);

        return (
          <MultipleOption
            key={index}
            index={index}
            optionData={option}
            selectOption={selectOption}
            isSelected={isSelected}
            cardBgColor={cardBgColor}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default MultipleResponse;

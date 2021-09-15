import { Button } from "@chakra-ui/button";
import { Divider, HStack } from "@chakra-ui/layout";
import React from "react";
import BinaryOption from "./BinaryOption";

export interface IOptionData {
  id: number;
  questionId: number;
  body: string;
}

export interface IBinary {
  options: IOptionData[];
  selectResponse: (selectedOptions: number) => void;
  selectedOptions: number[];
}

const Binary = ({ options, selectedOptions, selectResponse }: IBinary) => {
  const selectOption = (optionValue: number) => {
    if (selectedOptions.length > 0) selectedOptions.length = 0;
    selectResponse(optionValue);
  };

  return (
    <HStack spacing={0}>
      {options.map((option, index) => {
        const isSelected = selectedOptions.includes(option.id);

        return (
          <BinaryOption
            key={index}
            index={index}
            optionData={option}
            selectOption={selectOption}
            isSelected={isSelected}
          />
        );
      })}
    </HStack>
  );
};

export default Binary;

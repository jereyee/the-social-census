import { Center, HStack, VStack } from "@chakra-ui/layout";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import { MotionBox } from "components/motion";
import React, { useState } from "react";
import ScaleEnds from "./ScaleEnds";

export interface ISCale {
  selectResponse: (selectedOptions: number) => void;
  selectedOptions: number[];
}

const Scale = ({ selectedOptions, selectResponse }: ISCale) => {
  const defaultValue = selectedOptions.length > 0 ? selectedOptions[0] + 1 : 3;
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const selectOption = (optionValue: number) => {
    if (selectedOptions?.length > 0) selectedOptions.length = 0;
    selectResponse(optionValue - 1);
  };

  return (
    <VStack width="80%">
      <Center
        width="28px"
        height="28px"
        borderRadius="5.43px"
        borderColor="brand.magenta"
        borderWidth="1px"
        fontSize="12px"
        mb={2}
      >
        {currentValue}
      </Center>

      <Slider
        defaultValue={defaultValue}
        min={1}
        max={5}
        step={1}
        w="100%"
        onChange={(val) => setCurrentValue(val)}
        onChangeEnd={(val) => selectOption(val)}
        id="scale-slider"
      >
        <SliderTrack bg="brand.orange">
          <MotionBox position="relative" right={10} />
          <SliderFilledTrack bg="brand.magenta" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <ScaleEnds />
    </VStack>
  );
};

export default Scale;

import { Center, HStack, VStack } from "@chakra-ui/layout";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import Box from "components/motion/Box";
import React, { useState } from "react";

export interface ISCale {
  selectResponse: (selectedOptions: number) => void;
  selectedOptions: number[];
}

const Scale = ({ selectedOptions, selectResponse }: ISCale) => {
  const defaultValue = selectedOptions.length > 0 ? selectedOptions[0] : 3;
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const selectOption = (optionValue: number) => {
    if (selectedOptions?.length > 0) selectedOptions.length = 0;
    selectResponse(optionValue);
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
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="brand.magenta" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <HStack justifyContent="space-between" w="120%">
        <Text variant="overline" maxW="10ch" textAlign="center">
          Can&apos;t relate at all
        </Text>
        <Text variant="overline" maxW="10ch" textAlign="center">
          Relate completely
        </Text>
      </HStack>
    </VStack>
  );
};

export default Scale;
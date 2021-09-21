/* Single option component */

import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import { IOptionData } from "components/questions/Questions";

const BinaryOption = ({
  selectOption,
  optionData,
  index,
  isSelected,
}: {
  selectOption: (optionValue: number) => void;
  optionData: IOptionData;
  index: number;
  isSelected: boolean;
}) => {
  const optionSettings = [
    {
      color: "#F8A755",
    },
    {
      color: "#FF5668",
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
    <>
      <Button
        variant="poll"
        {...optionSettings[index]}
        onClick={() => {
          selectOption(optionData.id);
        }}
        isActive={isSelected}
      >
        <p>{optionData.body}</p>
      </Button>

      {index === 0 && (
        <Divider
          orientation="vertical"
          bg="white"
          h="64px"
          w="0.91px"
          opacity={1}
        />
      )}
    </>
  );
};

export default BinaryOption;
import { Circle } from "@chakra-ui/react";
import React from "react";

type DotButtonProps = {
  selected: boolean;
  onClick: (index: any) => void | undefined;
};

export const DotButton = ({ selected, onClick }: DotButtonProps) => (
  <Circle
    size="7.25px"
    onClick={onClick}
    bg={selected ? "#C4C4C4" : "#565656"}
  />
);

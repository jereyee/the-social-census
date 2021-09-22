import { chakra, HTMLChakraProps, VStack, Box, StackProps } from "@chakra-ui/react";
import { motion, HTMLMotionProps } from "framer-motion";

import { Merge } from "types/merge";

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

type MotionVStackProps = Merge<StackProps, HTMLMotionProps<"div">>;

export const MotionBox: React.FC<MotionBoxProps> = motion(Box);
export const MotionVStack: React.FC<MotionVStackProps> = motion(VStack);

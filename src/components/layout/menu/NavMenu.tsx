import {
  Box,
  Circle,
  Divider,
  Heading,
  HStack,
  IconProps,
  VStack,
  Text,
} from "@chakra-ui/react";
import Card from "components/micro/Card";
import React, { FC } from "react";
import {
  QuestionsAnswered,
  MatchResponses,
  SuggestQuestion,
  Settings,
} from "./Icons";

const NavMenu = () => {
  type menuItemsType = { icon: FC<IconProps>; text: string }[];
  const menuItems: menuItemsType = [
    {
      icon: () => <QuestionsAnswered />,
      text: "Questions answered",
    },
    {
      icon: () => <MatchResponses />,
      text: "Match responses",
    },
    {
      icon: () => <SuggestQuestion />,
      text: "Suggest a question",
    },
    {
      icon: () => <Settings />,
      text: "Settings",
    },
  ];

  return (
    <>
      {/* user card */}
      <Card w="100%" h="111px" padding="10%">
        <HStack w="100%" h="100%" justify="flex-start" spacing={6}>
          <Circle size="74px" bg="white" />
          <Heading as="h3" variant="heading3">
            username
          </Heading>
        </HStack>
      </Card>

      {/* navigation card */}
      <Card w="100%" padding="10%">
        <VStack w="100%" h="100%" align="flex-start" spacing={4}>
          {menuItems.map((menuItem, index) => {
            const Icon = menuItem["icon"];
            return (
              <VStack w="100%" align="flex-start" spacing={4} key={index}>
                <HStack spacing={2} align="center">
                  <Box width="30px" height="30px">
                    <Icon />
                  </Box>
                  <Text variant="caption">{menuItem.text}</Text>
                </HStack>

                {index !== menuItems.length - 1 && <Divider w="100%" />}
              </VStack>
            );
          })}
        </VStack>
      </Card>
    </>
  );
};

export default NavMenu;

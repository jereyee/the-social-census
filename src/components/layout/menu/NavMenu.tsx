/* eslint-disable react/display-name */
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import Card from "components/micro/Card";
import { MotionVStack } from "components/motion";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import { useAuth } from "utils/auth/AuthProvider";
import { signOutUser } from "utils/auth/firebase-config";
import {
  MatchResponses,
  QuestionsAnswered,
  Settings,
  SuggestQuestion,
} from "./Icons";
import UserAvatar from "./UserAvatar";

const NavMenu = () => {
  const router = useRouter();
  const { user } = useAuth();
  console.log({ user });

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
    <MotionVStack
      position="fixed"
      w="100%"
      h="100%"
      left="0"
      p={4}
      spacing={6}
      pt={8}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: .2,
      }}
    >
      {/* user card */}
      <Card w="100%" h="111px" padding="10%">
        <HStack w="100%" h="100%" justify="flex-start" spacing={6}>
          <UserAvatar currentUser={true} width="48px" height="48px" />
          <VStack alignItems="flex-start">
            <Heading as="h3" variant="heading3">
              {user?.displayName}
            </Heading>

            <Button
              onClick={() => {
                signOutUser();
                void router.push("/");
              }}
              variant="primary"
              height="20px"
            >
              Sign out
            </Button>
          </VStack>
        </HStack>
      </Card>

      {/* navigation card */}
      <Card w="100%" padding="10%">
        <VStack w="100%" h="100%" align="flex-start" spacing={4}>
          {menuItems.map((menuItem, index) => {
            const Icon = menuItem.icon;
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
    </MotionVStack>
  );
};

export default NavMenu;

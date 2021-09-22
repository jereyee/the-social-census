/* eslint-disable react/display-name */
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  IconProps,
  Text,
  VStack
} from "@chakra-ui/react";
import Card from "components/micro/Card";
import { MotionVStack } from "components/motion";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import { RiHome3Line } from "react-icons/ri";
import { themeColors } from "styles/colors";
import { useAuth } from "utils/auth/AuthProvider";
import { signOutUser } from "utils/auth/firebase-config";
import {
  MatchResponses,
  QuestionsAnswered, SuggestQuestion
} from "./Icons";
import UserAvatar from "./UserAvatar";

const NavMenu = () => {
  const router = useRouter();
  const { user } = useAuth();
  console.log({ user });

  type menuItemsType = { icon: FC<IconProps>; text: string; href: string }[];
  const menuItems: menuItemsType = [
    {
      icon: () => <Icon width="22px" height="22px" as={RiHome3Line} />,
      text: "Home",
      href: "/home",
    },
    {
      icon: () => <QuestionsAnswered />,
      text: "Questions answered",
      href: "/responses",
    },
    {
      icon: () => <MatchResponses />,
      text: "Match responses",
      href: "/match",
    },
    {
      icon: () => <SuggestQuestion />,
      text: "Suggest a question",
      href: "",
    } /* 
    {
      icon: () => <Settings />,
      text: "Settings",
      href: "",
    }, */,
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
        duration: 0.2,
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
        <VStack w="100%" h="100%" align="flex-start" spacing={0}>
          {menuItems.map((menuItem, index) => {
            const Icon = menuItem.icon;
            return (
              <MotionVStack
                w="100%"
                align="flex-start"
                pt={4}
                spacing={4}
                key={index}
                onClick={() => void router.push(menuItem.href)}
                _hover={
                  menuItem.href === router.pathname
                    ? {}
                    : {
                        bg: themeColors.grayscale.gray[300],
                        cursor: "pointer",
                      }
                }
                whileTap={{ scale: 0.9 }}
              >
                <HStack spacing={2} align="center">
                  <Box width="30px" height="30px">
                    <Icon />
                  </Box>
                  <Text variant="caption">{menuItem.text}</Text>
                </HStack>

                {index !== menuItems.length - 1 && <Divider w="100%" />}
              </MotionVStack>
            );
          })}
        </VStack>
      </Card>
    </MotionVStack>
  );
};

export default NavMenu;

import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Circle,
  Container,
  Heading,
  HStack,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import {
  Button,
  Text,
  useClipboard,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import InputWithIcon from "components/InputWithIcon";
import Header from "components/layout/menu/Header";
import UserAvatar from "components/layout/menu/UserAvatar";
import Card from "components/micro/Card";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import nookies from "nookies";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { APIEndpoints, getEndpoint } from "utils/api/functions";
import { fetcher } from "utils/api/GET";
import { matchWithFriendCode } from "utils/api/POST";
import WebShare from "utils/web-share/WebShare";
import Lottie from "react-lottie";
import * as animationData from "../../../public/lottie/loading_spinner_with_tick.json";
import { UserObject } from "./report";
import { useAuth } from "utils/auth/AuthProvider";

export const MatchingScreen = ({
  successLottieCallback,
}: {
  successLottieCallback: () => void;
}) => {
  const textRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const successLottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (typeof window !== undefined) {
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.innerHTML = "Success!";
        textRef.current.style.color = "rgb(129,230,217)";
      }
    }, 1350);
  }

  return (
    <VStack h="80vh" alignItems="center" justifyContent="center">
      <Text ref={textRef}>Creating match...</Text>
      <Lottie
        options={successLottieOptions}
        height={100}
        width={200}
        eventListeners={[
          {
            eventName: "complete",
            callback: () => successLottieCallback(),
          },
        ]}
      />
    </VStack>
  );
};

const Match = () => {
  const token = nookies.get(undefined, "token");
  const { data: fetchedMatchCode, error } = useSWR<
    { matchCode: string },
    string
  >([getEndpoint(APIEndpoints.GET_MATCH_CODE), token.token], fetcher);

  const { data: fetchedMatchHistory, error: matchHistoryError } = useSWR<
    MatchHistory,
    string
  >([getEndpoint(APIEndpoints.GET_MATCH_HISTORY), token.token], fetcher);

  const { user } = useAuth();

  const { hasCopied, onCopy } = useClipboard(fetchedMatchCode?.matchCode ?? "");
  const toast = useToast();

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const matchIdRef = useRef(1);
  const router = useRouter();

  const [matchSuccess, setMatchSuccess] = useState(false);

  if (hasCopied) {
    toast.closeAll();
    toast({
      title: "Copied successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  const submitFriendCode = () => {
    matchWithFriendCode({
      matchCode: inputRef.current.value,
      token: token.token,
    })
      .then((res) => {
        console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const data = res as Match;
        if (data.id) {
          /* match success */
          setMatchSuccess(true);
          matchIdRef.current = data.id;
        }
      })
      .catch((err: Error) => {
        console.log(err);
        toast.closeAll();
        let toastMessage = "Try again later?";
        if (err.message.includes("404")) toastMessage = "Can't find the user.";
        toast({
          title: "Something went wrong 😓",
          description: toastMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      });
  };

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const successLottieCallback = () => {
    void router.push(
      {
        pathname: "/match/report",
        query: { matchId: matchIdRef.current },
      },
      "/match/report"
    );
  };

  return matchSuccess ? (
    <MatchingScreen successLottieCallback={successLottieCallback} />
  ) : (
    <Box>
      {/* match responses header */}
      <Header headerText="Match Responses" />

      {/* content */}
      <VStack spacing={8}>
        <VStack spacing={4}>
          <UserAvatar currentUser={true} width="132px" height="132px" />
          <Heading as="h3" variant="body" textAlign="center">
            Discover similarities with your friends. <br />
            Let the results surprise you.
          </Heading>
        </VStack>
        <VStack w="90%" spacing={6}>
          {/* your code */}
          <VStack w="100%">
            <Text variant="caption" alignSelf="flex-start">
              Share with them your code:
            </Text>
            <Card w="100%" h="44px">
              <HStack justifyContent="space-between" w="100%" h="100%" px={4}>
                <Skeleton
                  isLoaded={!!(!error && fetchedMatchCode)}
                  speed={1.2}
                  w="100%"
                >
                  <Text>{fetchedMatchCode?.matchCode}</Text>
                </Skeleton>
                <CopyIcon
                  h="24px"
                  w="24px"
                  onClick={onCopy}
                  _active={{ color: "brand.purple" }}
                />
              </HStack>
            </Card>

            <HStack alignSelf="flex-start" pt={2} spacing={4}>
              <WebShare
                questionId={0}
                buttonVariant="primary"
                buttonProps={{ bg: "brand.purple" }}
                title="Match with me on Social Census!"
                body={`Match with me on The Social Census! \r\n My match code is: \r\n ${
                  fetchedMatchCode?.matchCode ?? ""
                }`}
                url={origin}
              />
              <Button variant="primary">
                <Link href="/responses">Edit exclusions</Link>
              </Button>
            </HStack>
          </VStack>

          {/* enter a code */}
          <VStack w="100%">
            <Text variant="caption" alignSelf="flex-start">
              Enter your friend&apos;s code:
            </Text>
            <Card w="100%" h="44px">
              <InputWithIcon
                placeholder="m2t3h"
                inputRef={inputRef}
                onSubmitClicked={submitFriendCode}
              />
            </Card>
          </VStack>

          {/* history */}
          <VStack w="100%">
            <Text variant="caption" alignSelf="flex-start">
              History ({fetchedMatchHistory?.matches.length}):
            </Text>
            <Card w="100%" h="auto" p={4}>
              <Skeleton
                isLoaded={!!(!error && fetchedMatchHistory)}
                speed={1.2}
                w="100%"
                h="100%"
              >
                {fetchedMatchHistory?.matches.length === 0 ? (
                  <Text variant="caption">
                    Nobody here yet &#128129; Start matching!
                  </Text>
                ) : (
                  <HStack spacing={4} w="100%" h="100%" alignItems="center">
                    <Wrap>
                      {fetchedMatchHistory &&
                        fetchedMatchHistory.matches.map((match, index) => {
                          const displayName =
                            match.user.displayName !== user?.displayName
                              ? match.user.displayName
                              : match.otherUser.displayName;
                          const photoURL =
                            match.user.photoURL !== user?.photoURL
                              ? match.user.photoURL
                              : match.otherUser.photoURL;
                          return (
                            <WrapItem key={index}>
                              <Box
                                onClick={() =>
                                  void router.push(
                                    {
                                      pathname: "/match/report",
                                      query: { matchId: match.id },
                                    },
                                    "/match/report"
                                  )
                                }
                              >
                                <UserAvatar
                                  currentUser={false}
                                  width="24px"
                                  height="24px"
                                  otherUser={{
                                    displayName: displayName,
                                    photoURL: photoURL,
                                  }}
                                />
                              </Box>
                            </WrapItem>
                          );
                        })}
                    </Wrap>
                  </HStack>
                )}
              </Skeleton>
            </Card>
          </VStack>
          {/* different bars */}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Match;

export interface MatchHistory {
  matches: Match[];
}

export interface Match {
  id: number;
  uid: string;
  otherUid: string;
  createdAt: string;
  matchedAt: string;
  user: UserObject;
  otherUser: UserObject;
}

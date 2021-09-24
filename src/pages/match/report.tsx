import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/layout";
import { Skeleton, Spinner, Text, useToast } from "@chakra-ui/react";
import Header from "components/layout/menu/Header";
import UserAvatar from "components/layout/menu/UserAvatar";
import Card from "components/micro/Card";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import React, { useEffect } from "react";
import useSWR from "swr";
import { IQuestion, IReport, IReportResponse, UserObject } from "types/shared";
import { trackEvent } from "utils/analytics";
import { APIEndpoints, getEndpoint } from "utils/api/functions";
import { fetcher } from "utils/api/GET";

const MatchCard = ({
  responseData,
  token,
  sameResponse,
  user,
  otherUser,
}: {
  responseData: Array<IReportResponse[]>;
  token: string;
  sameResponse: boolean;
  user: UserObject;
  otherUser: UserObject;
}) => {
  const { data: questionData, error } = useSWR<IQuestion, string>(
    [
      getEndpoint(APIEndpoints.GET_QUESTION, responseData[0][0].questionId),
      token,
    ],
    fetcher
  );

  const optionBodies = [
    responseData[0].map(
      (response) =>
        questionData?.options?.find((v) => v.id === response.optionId)?.body
    ),
  ];

  /* for different responses */
  if (!sameResponse) {
    optionBodies.push(
      responseData[1].map(
        (response) =>
          questionData?.options?.find((v) => v.id === response.optionId)?.body
      )
    );
  }

  /* for similar responses */
  /* const optionBodies = questionData?.options.find(
    (v) => v.id === responseData[0].optionId
  )?.body; */

  return (
    <Skeleton isLoaded={!!(!error && questionData)} w="100%" speed={1.2}>
      <Card w="100%" py={4}>
        <VStack
          w="100%"
          h="100%"
          px={4}
          alignItems="left"
          justifyContent="center"
        >
          <Text variant="caption">{questionData?.body}</Text>
          <VStack alignItems="flex-start">
            <HStack>
              {!sameResponse && (
                <UserAvatar
                  currentUser={false}
                  width="24px"
                  height="24px"
                  otherUser={{
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                  }}
                />
              )}
              <Text variant="caption" color="brand.pink">
                {optionBodies[0].map(
                  (body, index) =>
                    `${body ?? ""}${
                      index + 1 < optionBodies[0].length ? ", " : ""
                    }`
                )}
              </Text>
            </HStack>
            {!sameResponse && (
              <HStack mt={2}>
                (
                <UserAvatar
                  currentUser={false}
                  width="24px"
                  height="24px"
                  otherUser={{
                    displayName: otherUser.displayName,
                    photoURL: otherUser.photoURL,
                  }}
                />
                <Text variant="caption" color="brand.orange">
                  {optionBodies[1].map(
                    (body, index) =>
                      `${body ?? ""}${
                        index + 1 < optionBodies[1].length ? ", " : ""
                      }`
                  )}
                </Text>
              </HStack>
            )}
          </VStack>
        </VStack>
      </Card>
    </Skeleton>
  );
};

const Report = () => {
  const token = nookies.get(undefined, "token");
  const router = useRouter();

  const { data: fetchedMatchReport, error: fetchError } = useSWR<
    IReport,
    Error
  >(
    [
      getEndpoint(
        APIEndpoints.GET_MATCH_REPORT,
        0,
        0,
        parseInt((router.query.matchId as string) ?? 1)
      ),
      token.token,
    ],
    fetcher
  );

  const toast = useToast();

  if (fetchError) {
    toast.closeAll();
    toast({
      title: fetchError.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    void router.push("/login");
  }

  const matchReport = fetchedMatchReport?.matchReport;

  const matchPercentage = parseInt(matchReport?.matchPercentage ?? "");
  const CTAText =
    matchPercentage < 33
      ? "A diverse friendship could be waiting to blossom!"
      : matchPercentage < 67
      ? "There’s still a lot to know about them!"
      : "Are both of you close friends already?";

  /* combine the two different responses */
  const differentResponses =
    matchReport?.differentResponses1.map((response, index) => [
      response,
      matchReport?.differentResponses2[index],
    ]) ?? [];

  return !fetchError && matchReport ? (
    <Box>
      {/* match responses header */}
      <Header headerText="Match Responses" />

      {/* content */}
      {
        <VStack spacing={8}>
          <VStack spacing={4}>
            <HStack justifyContent="space-evenly" w="70%">
              <UserAvatar
                currentUser={false}
                width="112px"
                height="112px"
                otherUser={{
                  displayName: matchReport.user.displayName,
                  photoURL: matchReport.user.photoURL,
                }}
              />
              <Box />
              <UserAvatar
                currentUser={false}
                width="112px"
                height="112px"
                otherUser={{
                  displayName: matchReport.otherUser.displayName,
                  photoURL: matchReport.otherUser.photoURL,
                }}
              />
            </HStack>
            <VStack w="100%">
              <HStack justifyContent="space-evenly" w="70%">
                <Heading as="h3" variant="body" textAlign="center">
                  {matchReport?.user.displayName}
                </Heading>
                <Text>X</Text>
                <Heading as="h3" variant="body" textAlign="center">
                  {matchReport?.otherUser.displayName}
                </Heading>
              </HStack>
              <Heading
                fontSize="48px"
                textAlign="center"
                bg="linear-gradient(90deg, rgba(123, 81, 242, 0.98), rgba(238, 86, 140, 1))"
                backgroundClip="text"
                sx={{
                  WebkitTextFillColor: "transparent",
                }}
              >
                {matchPercentage}%
              </Heading>
              <Heading as="h3" variant="body" textAlign="center">
                similar responses
              </Heading>
            </VStack>
            <Heading as="h3" variant="caption" textAlign="center">
              {CTAText}
            </Heading>
          </VStack>

          <VStack w="90%" spacing={6}>
            {matchReport?.sameResponses.map((question, index) => (
              <MatchCard
                key={index}
                token={token.token}
                responseData={[question]}
                sameResponse={true}
                user={matchReport.user}
                otherUser={matchReport.otherUser}
              />
            ))}
          </VStack>

          {differentResponses.length > 0 && (
            <VStack w="90%" spacing={4}>
              <Heading as="h3" variant="heading3" textAlign="center">
                <span style={{ fontSize: "36px" }}>
                  {differentResponses.length}
                </span>{" "}
                &nbsp;different responses
              </Heading>
              {differentResponses.map((question, index) => (
                <MatchCard
                  key={index}
                  token={token.token}
                  responseData={question}
                  sameResponse={false}
                  user={matchReport.user}
                  otherUser={matchReport.otherUser}
                />
              ))}
            </VStack>
          )}
        </VStack>
      }
    </Box>
  ) : (
    <Center w="100%" h="80vh">
      <Spinner />
    </Center>
  );
};

export default Report;

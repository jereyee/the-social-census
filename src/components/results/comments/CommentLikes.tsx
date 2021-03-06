import { HStack } from "@chakra-ui/layout";
import { Icon, Text } from "@chakra-ui/react";
import nookies from "nookies";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import useSWR, { useSWRConfig } from "swr";
import { getEndpoint, APIEndpoints } from "utils/api/functions";
import { fetcher } from "utils/api/GET";
import { likeOrUnlikeComment } from "utils/api/POST";

const Likes = ({
  likes,
  commentId,
  questionId,
  refetchComments,
}: {
  likes: number;
  commentId: number;
  questionId: number;
  refetchComments: () => void;
}) => {
  const token = nookies.get(undefined, "token");
  /* 
  let myLikes: string[] = localStorage.getItem("likes")
    ? (JSON.parse(localStorage.getItem("likes") as string) as [])
    : []; */

  /* sync local storage with the API */
  const {
    data: fetchMyLikes,
    error,
    mutate: refreshMyLikes,
  } = useSWR<number[], string>(
    [
      getEndpoint(APIEndpoints.GET_USER_LIKED_COMMENTS, questionId),
      token.token,
    ],
    fetcher
  );

  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const [likesNumber, setLikesNumber] = useState(likes);

  useEffect(() => {
    if (!error && fetchMyLikes) {
      if (fetchMyLikes.includes(commentId) && !liked) setLiked(true);
      else if (!fetchMyLikes.includes(commentId) && liked) setLiked(false);
    }
  }, [fetchMyLikes]);

  useEffect(() => {
    setLikesNumber(likes);
  }, [likes]);

  const { mutate } = useSWRConfig();

  //if (liked && !myLikes.includes(commentId.toString())) setLiked(false);

  return (
    <HStack>
      <Icon
        as={AiOutlineLike}
        _hover={{
          cursor: "pointer",
        }}
        color={liked ? "brand.magenta" : "white"}
        onClick={() => {
          likeOrUnlikeComment({
            like: !liked,
            questionId: questionId,
            token: token.token,
            commentId: commentId,
          })
            .then((data) => {
              if (!liked) {
                refetchComments();
                setLikesNumber(likesNumber + 1);
                /* 
                myLikes.push(commentId.toString());
                localStorage.setItem("likes", JSON.stringify(myLikes)); */
              } else {
                refetchComments();
                setLikesNumber(likesNumber - 1);
                /* 
                const newLikes = myLikes.filter(
                  (like) => like !== commentId.toString()
                );
                localStorage.setItem("likes", JSON.stringify(newLikes)); */
              }
              void mutate([
                getEndpoint(APIEndpoints.GET_USER_LIKED_COMMENTS, questionId),
                token.token,
              ]);
              console.log(data);
              setLiked(!liked);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      />
      <Text variant="caption">{likesNumber}</Text>
    </HStack>
  );
};
export default Likes;

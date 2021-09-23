import { HStack } from "@chakra-ui/layout";
import { Icon, Text } from "@chakra-ui/react";
import nookies from "nookies";
import { IQuestion } from "pages/home";
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import useSWR from "swr";
import { getEndpoint, APIEndpoints } from "utils/api/functions";
import { fetcher } from "utils/api/GET";
import { likeOrUnlikeComment } from "utils/api/POST";

const Likes = ({
  likes,
  commentId,
  questionId,
}: {
  likes: number;
  commentId: number;
  questionId: number;
}) => {
  const token = nookies.get(undefined, "token");
  /* 
  let myLikes: string[] = localStorage.getItem("likes")
    ? (JSON.parse(localStorage.getItem("likes") as string) as [])
    : []; */

  /* sync local storage with the API */
  const { data: fetchMyLikes, error } = useSWR<number[], string>(
    [
      getEndpoint(APIEndpoints.GET_USER_LIKED_COMMENTS, questionId),
      token.token,
    ],
    fetcher
  );

  const [liked, setLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likes);

  if (!error && fetchMyLikes)
    if (fetchMyLikes.includes(commentId) && !liked) setLiked(true);

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
                setLikesNumber(likesNumber + 1);
                /* 
                myLikes.push(commentId.toString());
                localStorage.setItem("likes", JSON.stringify(myLikes)); */
              } else {
                setLikesNumber(likesNumber - 1);
                /* 
                const newLikes = myLikes.filter(
                  (like) => like !== commentId.toString()
                );
                localStorage.setItem("likes", JSON.stringify(newLikes)); */
              }
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

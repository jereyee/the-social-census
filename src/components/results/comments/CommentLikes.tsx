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
  const myLikes: string[] = localStorage.getItem("likes")
    ? (JSON.parse(localStorage.getItem("likes") as string) as [])
    : [];

  /* sync local storage with the API */
  /* const { data: fetchMyLikes, error } = useSWR<number[], string>(
    [
      getEndpoint(APIEndpoints.GET_USER_LIKED_COMMENTS, questionId),
      token.token,
    ],
    fetcher
  ); */
  /* 
  if (!error && fetchMyLikes)
    myLikes = fetchMyLikes.map((like) => like.toString()); */

  const [liked, setLiked] = useState(myLikes.includes(commentId.toString()));

  if (liked && !myLikes.includes(commentId.toString())) setLiked(false);

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
                myLikes.push(commentId.toString());
                localStorage.setItem("likes", JSON.stringify(myLikes));
              } else {
                const newLikes = myLikes.filter(
                  (like) => like !== commentId.toString()
                );
                localStorage.setItem("likes", JSON.stringify(newLikes));
              }
              console.log(data);
              setLiked(!liked);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      />
      <Text variant="caption">{liked ? likes + 1 : likes}</Text>
    </HStack>
  );
};
export default Likes;

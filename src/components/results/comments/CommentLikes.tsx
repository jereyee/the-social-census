import { HStack } from "@chakra-ui/layout";
import { Icon, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { likeOrUnlikeComment } from "utils/api/POST";
import QuestionsContext from "utils/questionsContext";
import nookies from "nookies";

const Likes = ({ likes, id }: { likes: number; id: number }) => {
  const myLikes: string[] = localStorage.getItem("likes")
    ? (JSON.parse(localStorage.getItem("likes") as string) as [])
    : [];

  const [liked, setLiked] = useState(myLikes.includes(id.toString()));
  const { questionState } = useContext(QuestionsContext);

  if (liked && !myLikes.includes(id.toString())) setLiked(false);
  const token = nookies.get(undefined, "token");

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
            questionId: questionState.id,
            token: token.token,
            commentId: id,
          })
            .then((data) => {
              if (!liked) {
                myLikes.push(id.toString());
                localStorage.setItem("likes", JSON.stringify(myLikes));
              } else {
                const newLikes = myLikes.filter(
                  (like) => like !== id.toString()
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

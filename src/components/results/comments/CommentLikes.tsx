import { HStack } from "@chakra-ui/layout";
import { Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

const Likes = ({ likes, id }: { likes: number; id: number }) => {
  const myLikes: string[] = localStorage.getItem("likes")
    ? (JSON.parse(localStorage.getItem("likes") as string) as [])
    : [];

  const [liked, setLiked] = useState(myLikes.includes(id.toString()));

  if (liked && !myLikes.includes(id.toString())) setLiked(false);

  return (
    <HStack>
      <Icon
        as={AiOutlineLike}
        _hover={{
          cursor: "pointer",
        }}
        color={liked ? "brand.magenta" : "white"}
        onClick={() => {
          if (!liked) {
            myLikes.push(id.toString());
            localStorage.setItem("likes", JSON.stringify(myLikes));
            setLiked(true);
          } else {
            const newLikes = myLikes.filter((like) => like !== id.toString());
            localStorage.setItem("likes", JSON.stringify(newLikes));
            setLiked(false);
          }
        }}
      />
      <Text variant="caption">{liked ? likes + 1 : likes}</Text>
    </HStack>
  );
};
export default Likes;

import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "utils/auth/AuthProvider";

const UserAvatar = ({
  currentUser,
  otherUser,
  width = "32px",
  height = "32px",
  marginX = "2px",
  padding = "2px",
}: {
  currentUser: boolean;
  otherUser?: { displayName: string; photoURL: string };
  width?: string;
  height?: string;
  marginX?: string;
  padding?: string;
}) => {
  const { user } = useAuth();

  return currentUser ? (
    <Avatar
      name={user?.displayName ?? undefined}
      src={user?.photoURL ?? undefined}
      w={width}
      h={height}
      mx={marginX}
      p={padding}
    />
  ) : (
    <Avatar
      name={otherUser?.displayName ?? undefined}
      src={user?.photoURL ?? undefined}
      w={width}
      h={height}
      mx={marginX}
      p={padding}
    />
  );
};

export default UserAvatar;

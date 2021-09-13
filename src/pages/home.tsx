import { Box, Button } from "@chakra-ui/react";
import { signOut } from "@firebase/auth";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { signOutUser } from "utils/firebase-config";
const Home = () => {
  const router = useRouter();
  return (
    <Box mb={8} w="full">
      <Button
        onClick={() => {
          signOutUser();
          void router.push("/");
        }}
        variant="primary"
      >
        Sign out
      </Button>
    </Box>
  );
};

export default Home;

import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Input } from "@chakra-ui/react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { SignInError } from "pages/login";
import React, { useState } from "react";
import { actionCodeSettings } from "utils/auth/firebase-config";

export const EmailPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const auth = getAuth();
  const [linkSent, setLinkSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  /* Email Sign-In */
  const loginWithEmail = (email: string) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        setUserEmail(email);
        setLinkSent(true);
        // ...
      })
      .catch((error: SignInError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ error });
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="grayscale.gray.300" align="center" justify="center">
          <ModalHeader textAlign="center" mt={12}>
            {linkSent ? "Check your inbox." : "Sign in with email"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Text variant="body" maxW="80%" margin="0 auto">
              {linkSent
                ? `Click the link we sent to ${userEmail}.`
                : "Enter your email address, and we’ll send a magic link to your inbox."}
            </Text>
            {linkSent ? (
              <Button
                mt={6}
                variant="solid"
                px="27px"
                type="submit"
                bg="black"
                _hover={{ color: "black", bg: "white" }}
                onClick={onClose}
              >
                Okay!
              </Button>
            ) : (
              <>
                <Text
                  variant="caption"
                  maxW="80%"
                  margin="0 auto"
                  mt={8}
                  mb={4}
                >
                  Your email
                </Text>
                <form
                  onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    const target = e.target as typeof e.target & {
                      email: { value: string };
                      password: { value: string };
                    };
                    const email = target.email.value;
                    loginWithEmail(email);
                  }}
                >
                  <Input
                    variant="outline"
                    placeholder="wokeguy@gmail.com"
                    type="email"
                    id="email"
                  />
                  <Button
                    mt={6}
                    variant="solid"
                    px="27px"
                    type="submit"
                    bg="black"
                    _hover={{ color: "black", bg: "white" }}
                  >
                    Continue
                  </Button>
                </form>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {/* 
              <Button variant="naked" mr={3} onClick={onClose}>
                Back
              </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/layout";
import { EmailPopup } from "components/sign-in/EmailPopup";
import PrivacyPolicy from "components/sign-in/PrivacyPolicy";
import SignInButtons from "components/sign-in/SignInButtons";
import { FirebaseError } from "firebase/app";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  onAuthStateChanged,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
export interface SignInError extends FirebaseError {
  email: string;
}

const Login = () => {
  const [isAuth, setIsAuth] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState("");

  const router = useRouter();

  const auth = getAuth();

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") setIsAuth(true);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email if available.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // To prevent session fixation attacks
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email as string, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          window.localStorage.setItem("auth", "true");
          if (getAdditionalUserInfo(result)?.isNewUser)
            window.localStorage.setItem("isNewUser", "true");
          void router.push("/login/update");
        })
        .catch((error) => {
          console.log(error);
        });

      return;
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        window.localStorage.setItem("auth", "true");
        void user.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });

    return () => {
      setIsAuth(false);
      setToken("");
    };
  }, []);

  /* Google Sign-In */
  const loginWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        window.localStorage.setItem("auth", "true");
        if (getAdditionalUserInfo(result)?.isNewUser) {
          window.localStorage.setItem("isNewUser", "true");
          void router.push("/login/update");
        }
        // ...
      })
      .catch((error: SignInError) => {
        console.log({ error });
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const signInMethods = [
    {
      type: "Google",
      label: "Continue with Google",
      icon: {
        src: "/icons/socials/google_social.svg",
        alt: "Google Sign In",
      },
      callback: () => loginWithGoogle(),
    },
    {
      type: "Email",
      label: "Continue with Email",
      icon: {
        src: "/icons/socials/mail.svg",
        alt: "Email Sign In",
      },
      callback: () => onOpen(),
    },
  ];

  if (isAuth) {
    void router.push("/home");
  }

  return (
    <Box>
      {!isAuth ? (
        <Center mt="10%">
          <VStack spacing={8} align="flex-start" w="fit-content">
            <VStack spacing={4} align="left">
              <Heading as="h2" variant="heading3">
                Log in to The Social Census
              </Heading>
              <Text variant="body" color="#CFCFCF">
                Join the conversation.
              </Text>
            </VStack>
            <SignInButtons signInMethods={signInMethods} />
            <EmailPopup isOpen={isOpen} onClose={onClose} />
            <Box maxW="36ch">
              <Text variant="caption" color="grayscale.gray.100" maxW="36ch">
                Your privacy matters to us. <br />
                Find out more in our{" "}
              </Text>
              <PrivacyPolicy />
            </Box>
          </VStack>
        </Center>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default Login;

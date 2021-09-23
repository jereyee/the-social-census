import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/layout";
import { EmailPopup } from "components/sign-in/EmailPopup";
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
  const [token, setToken] = useState("");

  const router = useRouter();

  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") setIsAuth(true);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
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
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
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
        }
        // ...
      })
      .catch((error: SignInError) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ error });
        // ...
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
    const isNewUser = window.localStorage.getItem("isNewUser");
    if (isNewUser && isNewUser === "true") void router.push("/login/update");
    else void router.push("/home");
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

            <Text variant="caption" color="grayscale.gray.100" maxW="36ch">
              Your privacy matters to us. <br />
              Find out more in our privacy policy.
            </Text>
          </VStack>
        </Center>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default Login;

import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import {
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from "@firebase/auth";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import React, { MutableRefObject } from "react";
import { deleteUserAccount } from "utils/api/DELETE";
import { useAuth } from "utils/auth/AuthProvider";

const DeleteAccount = () => {
  const token = nookies.get(undefined, "token");

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef() as MutableRefObject<HTMLButtonElement>;

  const toast = useToast();

  const { user } = useAuth();

  const errorToast = (message: string) => {
    toast({
      title: `Couldn't delete your account. ${message}`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const router = useRouter();

  const auth = getAuth();

  return (
    <>
      <Button
        variant="primary"
        fontSize="10px"
        height="32px"
        bg="red.700"
        onClick={() => setIsOpen(true)}
      >
        Delete Account
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent w="80%" bg="grayscale.gray.300">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="naked" ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                height="32px"
                bg="red.700"
                onClick={() => {
                  deleteUserAccount({ token: token.token })
                    .then((res) => {
                      console.log(res);

                      if (user) {
                        if (user.providerId === "google.com") {
                          reauthenticateWithPopup(
                            user,
                            new GoogleAuthProvider()
                          )
                            .then((credentials) => {
                              console.log("re-outh", credentials);
                              deleteUser(user)
                                .then(() => {
                                  toast({
                                    title: `Account successfully deleted.`,
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                  });
                                  void router.push("/");
                                })
                                .catch((error) => {
                                  errorToast(error);
                                });
                            })
                            .catch((error) => {
                              errorToast(error);
                            });
                        } else {
                          deleteUser(user)
                            .then(() => {
                              toast({
                                title: `Account successfully deleted.`,
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                              });
                              void auth.signOut();
                              void router.push("/");
                            })
                            .catch((error) => {
                              errorToast(error);
                            });
                        }
                      } else {
                        errorToast("Can't find user!");
                      }
                    })
                    .catch((err: Error) => {
                      errorToast(err.message);
                    });
                }}
                ml={3}
                color="white"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAccount;

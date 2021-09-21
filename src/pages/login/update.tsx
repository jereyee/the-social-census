import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { useDisclosure, UseDisclosureProps } from "@chakra-ui/hooks";
import { WarningIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Center, Heading, HStack, Stack } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { updateProfile } from "@firebase/auth";
import {
  Field,
  FieldHookConfig,
  FieldInputProps,
  FieldMetaProps,
  FieldProps,
  Form,
  Formik,
  FormikBag,
  FormikProps,
  FormikValues,
  useField,
} from "formik";
import { useRouter } from "next/dist/client/router";
import React, { FC, useState } from "react";
import { useAuth } from "utils/AuthProvider";

import Lottie from "react-lottie";
import * as animationData from "../../../public/lottie/loading_spinner_with_tick.json";
import ErrorModal from "components/ErrorModal";

// intersecting
interface ICustomFieldProps {
  label: string;
}

export const CustomInput: FC<FieldHookConfig<string> & ICustomFieldProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel
        id={`${props.id ?? ""}-${props.name}-label`}
        htmlFor={`${props.id ?? ""}-${props.name}-input`}
        textAlign="center"
      >
        {label}
      </FormLabel>
      <Input {...field} id={`${props.id ?? ""}-${props.name}-input`} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

const Update = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState(false);

  const errorMessage =
    "Sorry! <br/> We couldn't update your account ☹ <br/> Please try again.";

  const successLottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const successCallback = () =>
    void router.push(
      {
        pathname: "/home",
      },
      "/home"
    );

  const submitName = (name: string) => {
    if (user) {
      updateProfile(user, {
        displayName: name,
        //photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(() => {
          console.log("Profile updated!");
          setSuccess(true);
          // ...
        })
        .catch((error) => {
          console.log(error);
          onOpen();
          // An error occurred
          // ...
        });
    }
  };

  function validateName(values: { name: string }) {
    let error: string | undefined;
    if (!values.name) {
      error = "Please type in something!";
    }

    return error ? { name: error } : {};
  }

  return (
    <Center w="100%" h="80vh">
      {!success ? (
        <>
          <Formik
            initialValues={{ name: "john cena" }}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              submitName(values.name);
              actions.setSubmitting(false);
            }}
            validate={validateName}
          >
            <Form style={{ textAlign: "center" }}>
              <CustomInput
                label="Choose a display name"
                id="name"
                name="name"
              />
              <Button mt={4} type="submit" w="100px" variant="primary">
                Enter
              </Button>
            </Form>
          </Formik>
          <ErrorModal error={errorMessage} isOpen={isOpen} onClose={onClose} />
        </>
      ) : (
        <Lottie
          options={successLottieOptions}
          height={200}
          width={200}
          eventListeners={[
            {
              eventName: "complete",
              callback: () => successCallback(),
            },
          ]}
        />
      )}
    </Center>
  );
};
export default Update;

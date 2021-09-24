import { Button } from "@chakra-ui/button";
import {
    FormControl,
    FormErrorMessage,
    FormLabel
} from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Center } from "@chakra-ui/layout";
import { Progress, Slide } from "@chakra-ui/react";
import { updateProfile } from "@firebase/auth";
import ErrorModal from "components/ErrorModal";
import { FieldHookConfig, Form, Formik, useField } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "utils/auth/AuthProvider";

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
      <Input
        {...field}
        id={`${props.id ?? ""}-${props.name}-input`}
        placeholder={`${props.placeholder ?? ""}`}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

const UpdateName = ({ successCallback }: { successCallback: () => void }) => {
  const { user } = useAuth();

  const [isNewUser, setIsNewUser] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show] = useState(true);

  const errorMessage =
    "Sorry! <br/> We couldn't update your account ☹ <br/> Please try again.";

  const submitName = (name: string) => {
    if (user) {
      updateProfile(user, {
        displayName: name,
        //photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(() => {
          console.log("Profile updated!");
          successCallback();
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

  useEffect(() => {
    if (!localStorage.getItem("isNewUser")) setIsNewUser(false);
  }, []);

  return (
    <>
      <Progress value={50} size="xs" colorScheme="purple" />
      <Slide direction="right" in={show}>
        <Center w="100%" h="100vh">
          <>
            <Formik
              enableReinitialize
              initialValues={{
                name: isNewUser ? "" : user?.displayName ?? "ababab",
              }}
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
                  placeholder={isNewUser ? "john cena" : ""}
                />
                <Button mt={8} type="submit" w="100px" variant="primary">
                  Next
                </Button>
              </Form>
            </Formik>
            <ErrorModal
              error={errorMessage}
              isOpen={isOpen}
              onClose={onClose}
            />
          </>
        </Center>
      </Slide>
    </>
  );
};

export default UpdateName;

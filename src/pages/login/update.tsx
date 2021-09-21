import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Stack } from "@chakra-ui/layout";
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
import React, { FC } from "react";
import { useAuth } from "utils/AuthProvider";

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

  const submitName = (name: string) => {
    if (user) {
      updateProfile(user, {
        displayName: name,
        //photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
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
      <Formik
        initialValues={{ name: "harrypotter" }}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          //submitName(values.name);
          actions.setSubmitting(false);
        }}
        validate={validateName}
      >
        <Form style={{ textAlign: "center" }}>
          <CustomInput label="Choose a username" id="name" name="name" />
          <Button mt={4} type="submit" w="100px" variant="primary">
            Enter
          </Button>
        </Form>
      </Formik>
    </Center>
  );

  return (
    <Center w="100%" h="80vh">
      <form style={{ textAlign: "center" }}>
        <FormControl>
          <FormLabel htmlFor="name" textAlign="center" id="label">
            Choose a username:
          </FormLabel>
          <Input id="name" placeholder="name" />
          {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
        </FormControl>
        <Button
          mt={4}
          variant="primary"
          /* isLoading={props.isSubmitting} */
          type="submit"
          w="100px"
          onClick={() => submitName}
        >
          Enter
        </Button>
      </form>
    </Center>
  );
};

export default Update;

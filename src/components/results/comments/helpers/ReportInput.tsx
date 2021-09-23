import { Input } from "@chakra-ui/input";
import { VStack, Text } from "@chakra-ui/layout";
import React, { useState } from "react";

const ReportInput = ({
  inputRef,
  placeholder,
  username,
}: {
  inputRef: React.MutableRefObject<HTMLInputElement>;
  placeholder: string;
  username: string;
}) => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <VStack spacing={4}>
      <Text textAlign="center">
        Are you sure you want to report {username}? <br />
        Help us know why.
      </Text>
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        ref={inputRef}
      />
    </VStack>
  );
};

export default ReportInput;

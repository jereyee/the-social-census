import { Button } from "@chakra-ui/button";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import ResizeTextarea from "react-textarea-autosize";

const InputWithIcon = ({
  onSubmitClicked,
  inputRef,
  placeholder,
}: {
  onSubmitClicked: (body: string) => void;
  inputRef: React.MutableRefObject<HTMLTextAreaElement>;
  placeholder: string;
}) => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);

  return (
    <InputGroup>
      <Textarea
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        ref={inputRef}
        minHeight="40px !important"
        minRows={1}
        as={ResizeTextarea}
        resize="none"
        pl={4}
        pr={8}
      />
      {value.length > 0 && (
        <InputRightElement>
          <Button
            variant="naked"
            onClick={() => {
              onSubmitClicked(value);
              setValue("");
            }}
          >
            <ChevronRightIcon h="28px" w="28px" />
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default InputWithIcon;

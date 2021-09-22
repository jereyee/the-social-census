import { Button } from "@chakra-ui/button";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/input";
import React, { useState } from "react";

const InputWithIcon = ({
  onSubmitClicked,
  inputRef,
  placeholder,
}: {
  onSubmitClicked: (body: string) => void;
  inputRef: React.MutableRefObject<HTMLInputElement>;
  placeholder: string;
}) => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <InputGroup>
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        ref={inputRef}
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

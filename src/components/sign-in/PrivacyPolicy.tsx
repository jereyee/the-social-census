import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { Button, Text } from "@chakra-ui/react";
import React from "react";

const PrivacyPolicy = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text onClick={onOpen} variant="caption" color="brand.pink" >
        Privacy Policy.
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="grayscale.gray.300" w="90%">
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text dangerouslySetInnerHTML={{ __html: privacypolicyString }} fontSize="caption"/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Okay!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PrivacyPolicy;

const privacypolicyString = `Your privacy is important to us. 
<br/><br/>
All your personal information you provide us with is considered private, and it will not be shared or sold to any third parties under any circumstances. Any public-facing information for the purposes stated below will only be displayed under the guise of anonymity. 
<br/><br/>
If you choose to respond to a question on The Social Census, then you agree to the collection and use of information in relation to this policy. We use this information for the sole purpose(s) of:
<br/><br/>
<li> Data aggregation and visualization </li>
<li> User categorization </li>
<br/><br/>
We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy unless a longer retention period is required or permitted by law.`;

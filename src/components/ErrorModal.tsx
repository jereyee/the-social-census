import { Button } from "@chakra-ui/button";
import { UseDisclosureProps } from "@chakra-ui/hooks";
import { WarningIcon } from "@chakra-ui/icons";
import { Heading, HStack } from "@chakra-ui/layout";
import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/modal";
import React from "react";

interface IModal extends UseDisclosureProps {
  error: string;
  finalFocusRef?: React.MutableRefObject<HTMLElement>;
  initialFocusRef?: React.MutableRefObject<HTMLElement>;
}

const ErrorModal = ({
  error,
  isOpen,
  onClose,
  finalFocusRef,
  initialFocusRef,
}: IModal) => {
  return (
    <>
      {isOpen && !!onClose && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          finalFocusRef={finalFocusRef}
          initialFocusRef={initialFocusRef}
        >
          <ModalOverlay />
          <ModalContent w="80%" bg="grayscale.gray.300">
            <ModalHeader>
              <HStack spacing={3}>
                <WarningIcon w="20px" height="20px" color="red" />
                <Heading variant="body" as="h3">
                  Error
                </Heading>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              textAlign="center"
              dangerouslySetInnerHTML={{ __html: error }}
            ></ModalBody>

            <ModalFooter justifyContent="center">
              <Button
                variant="solid"
                bg="grayscale.gray.200"
                mr={3}
                onClick={onClose}
              >
                Return
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ErrorModal;

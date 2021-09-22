import { Button, ButtonProps } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface IAlert {
  header: string;
  message?: string;
  alertBody?: JSX.Element;
  buttonText: string;
  buttonProps?: ButtonProps;
  onButtonClick: () => void;
}

const AlertModal = ({
  buttonProps,
  buttonText,
  header,
  alertBody,
  onButtonClick,
}: IAlert) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => {
    onButtonClick();
    setIsOpen(false);
  };
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <>
      <Button onClick={() => setIsOpen(true)} {...buttonProps}>
        {buttonText}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent w="80%">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>
              {alertBody ?? (
                <Text>
                  {" "}
                  Are you sure? You can&apos;t undo this action afterwards.{" "}
                </Text>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant="naked"
                ref={cancelRef}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" bg="red" onClick={onClose} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertModal;

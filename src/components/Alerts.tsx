import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";

type AlertStatus = "error" | "info" | "warning" | "success" | undefined;

export const ShowAlert = ({
  message,
  status,
}: {
  message: string;
  status: AlertStatus;
}) => (
  <Alert status={status}>
    <AlertIcon />
    <AlertDescription>{message}</AlertDescription>
    <CloseButton position="absolute" right="8px" top="8px" />
  </Alert>
);

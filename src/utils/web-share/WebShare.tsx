import { Button, ButtonProps } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { buttonStyles } from "styles/overrides/button";

const WebShare = ({
  questionId,
  buttonVariant,
  buttonProps,
}: {
  questionId: number;
  buttonVariant: string;
  buttonProps?: ButtonProps;
}) => {
  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      navigator
        .share({
          url: `https://google.com/${questionId}`,
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };
  return (
    <Box>
      <Button
        onClick={handleShareButton}
        title="Share this question"
        variant={buttonVariant}
        {...buttonProps}
      >
        Share
      </Button>
    </Box>
  );
};

export default WebShare;

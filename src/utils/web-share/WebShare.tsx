import { Button, ButtonProps } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { buttonStyles } from "styles/overrides/button";

const WebShare = ({
  questionId,
  buttonVariant,
  buttonProps,
  title,
  body,
  url,
}: {
  questionId: number;
  buttonVariant: string;
  buttonProps?: ButtonProps;
  title: string;
  body: string;
  url: string;
}) => {
  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: body,
          url: `${url}`,
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

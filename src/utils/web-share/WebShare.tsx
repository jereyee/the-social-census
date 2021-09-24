import { Button, ButtonProps } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { trackEvent } from "utils/analytics";

const WebShare = ({
  buttonVariant,
  buttonProps,
  title,
  body,
  url,
}: {
  buttonVariant: string;
  buttonProps?: ButtonProps;
  title: string;
  body: string;
  url: string;
}) => {
  const handleShareButton = () => {
    trackEvent("socialShare", {
      body: body,
    });
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

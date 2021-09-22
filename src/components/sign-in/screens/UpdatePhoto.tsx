import { Button } from "@chakra-ui/button";
import { Center, SimpleGrid, VStack } from "@chakra-ui/layout";
import { Avatar, Progress, Slide, Text, useToast } from "@chakra-ui/react";
import { updateProfile } from "@firebase/auth";
import { MotionBox } from "components/motion";
import React, { useState } from "react";
import { useAuth } from "utils/auth/AuthProvider";

const PHOTO_URLS = [
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/aircraft.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/bmo.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/bumper-car.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/controller.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/corgi.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/hummingbird.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/joystick.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/lamp.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/owl.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/pelican.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/rocket.png",
  "https://socialcensus.s3.ap-southeast-1.amazonaws.com/avatars/scooter.png",
];

const UpdatePhoto = ({ successCallback }: { successCallback: () => void }) => {
  const { user } = useAuth();
  const toast = useToast();

  const [photoIndex, setPhotoIndex] = useState(0);

  const [show] = useState(true);

  const submitPhoto = () => {
    if (user) {
      updateProfile(user, {
        photoURL: PHOTO_URLS[photoIndex],
      })
        .then(() => {
          console.log("Profile updated!");
          successCallback();
          // ...
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: `Error updating photo`,
            status: "error",
            isClosable: true,
          });
        });
    }
  };

  const indexAnimation = {
    animate: { y: [-5, 0, -5] },
    transition: { repeat: Infinity, duration: 2 },
  };

  return (
    <>
      <Progress value={100} size="xs" colorScheme="purple" />
      <Slide direction="right" in={show}>
        <Center w="100%" h="100vh">
          <VStack spacing={8}>
            <Text>Choose a display photo</Text>
            <SimpleGrid columns={4} spacingX={6} spacingY={6}>
              {PHOTO_URLS.map((url, index) => (
                <MotionBox
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  {...(photoIndex === index
                    ? indexAnimation
                    : { animate: { y: 0 } })}
                >
                  <Avatar
                    src={url}
                    size="lg"
                    py={2}
                    px={1}
                    border={photoIndex === index ? "2px solid magenta" : "none"}
                    boxShadow={
                      photoIndex === index ? "0 0 5px 1px magenta" : "none"
                    }
                    onClick={() => setPhotoIndex(index)}
                  />
                </MotionBox>
              ))}
            </SimpleGrid>
            <Button
              type="submit"
              w="100px"
              variant="primary"
              onClick={() => submitPhoto()}
            >
              Done
            </Button>
          </VStack>
        </Center>
      </Slide>
    </>
  );
};

export default UpdatePhoto;

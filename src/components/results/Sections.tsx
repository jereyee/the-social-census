import { ArrowUpDownIcon } from "@chakra-ui/icons";
import {
  Divider,
  Drawer,
  DrawerOverlay,
  Heading,
  useDisclosure,
  VStack,
  Text,
  HStack,
  Box,
} from "@chakra-ui/react";
import { ICommentsList } from "pages/result";
import React, { useRef, useState } from "react";
import CommentsDrawer from "./comments/CommentsDrawer";
import KnowMoreDrawer from "./knowMore/KnowMoreDrawer";

const Sections = ({
  commentsList,
  knowMore,
  refreshComments,
}: {
  commentsList: ICommentsList[] | undefined;
  knowMore: Record<string, unknown>;
  refreshComments: () => void;
}) => {
  const {
    isOpen: isKnowMoreOpen,
    onOpen: onKnowMoreOpen,
    onClose: onKnowMoreClose,
  } = useDisclosure();

  const {
    isOpen: isCommentsOpen,
    onOpen: onCommentsOpen,
    onClose: onCommentsClose,
  } = useDisclosure();

  const sectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const sectionData = {
    knowMore: {
      title: "Did you know?",
      preview: "aaaa",
      data: {
        didYouKnow: "abcdefg?",
        sources: "wikipedia",
      },
    },
    comments: {
      title: "Comments",
      preview: commentsList
        ? commentsList.length > 0
          ? commentsList[0].body
          : "No one has commented. Be the first."
        : "☹ Couldn't load comments",
      data: commentsList,
    },
  };

  const [selected, setSelected] = useState<
    typeof sectionData.knowMore | typeof sectionData.comments | undefined
  >(undefined);

  if (selected?.title == sectionData.knowMore.title && !isKnowMoreOpen) {
    onKnowMoreOpen();
  } else if (selected?.title == sectionData.comments.title && !isCommentsOpen) {
    onCommentsOpen();
  }

  const closeKnowMore = () => {
    setSelected(undefined);
    onKnowMoreClose();
  };

  const closeComments = () => {
    setSelected(undefined);
    onCommentsClose();
  };

  return (
    <VStack w="100%" alignItems="flex-start">
      {Object.entries(sectionData).map((section, index) => (
        <VStack
          key={index}
          w="100%"
          alignItems="flex-start"
          ref={sectionRef}
          onClick={() => setSelected(section[1])}
          _active={{
            cursor: "pointer",
            backgroundColor: "grayscale.white.60",
          }}
        >
          <Divider borderWidth="1px" />
          <HStack justifyContent="space-between" w="98%">
            <VStack alignItems="flex-start" px="2%">
              <Heading as="h5" variant="headline">
                {section[1].title}
              </Heading>
              <Text variant="caption" color="grayscale.gray.100">
                {section[1].preview}
              </Text>
            </VStack>
            <ArrowUpDownIcon height="18px" width="18px" />
          </HStack>
        </VStack>
      ))}
      <Divider borderWidth="1px" />

      <Drawer
        isOpen={isKnowMoreOpen}
        placement="bottom"
        onClose={closeKnowMore}
        finalFocusRef={sectionRef}
        autoFocus={false}
      >
        <DrawerOverlay />
        <KnowMoreDrawer
          data={sectionData.knowMore.data}
          onClose={closeKnowMore}
        />
      </Drawer>

      {sectionData.comments.data && (
        <Drawer
          isOpen={isCommentsOpen}
          placement="bottom"
          onClose={closeComments}
          finalFocusRef={sectionRef}
          autoFocus={false}
        >
          <DrawerOverlay />
          <CommentsDrawer
            data={sectionData.comments.data}
            onClose={closeComments}
            refreshComments={refreshComments}
          />
        </Drawer>
      )}
    </VStack>
  );
};

export default Sections;

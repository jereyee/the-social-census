import { ArrowUpDownIcon } from "@chakra-ui/icons";
import {
  Divider,
  Drawer,
  DrawerOverlay,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ICommentsList, IKnowMore, IQuestion } from "types/shared";
import CommentsDrawer from "./comments/CommentsDrawer";
import KnowMoreDrawer from "./knowMore/KnowMoreDrawer";

const Sections = ({
  commentsList,
  refreshComments,
  questionData,
}: {
  commentsList: ICommentsList[] | undefined;
  refreshComments: () => void;
  questionData: IQuestion;
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

  const topComment =
    commentsList &&
    commentsList.length > 0 &&
    commentsList.sort(function (a, b) {
      return b.likes - a.likes;
    })[0].body;

  const knowMoreData = questionData.knowMore as unknown as IKnowMore;
  const knowMoreSection = Object.keys(knowMoreData).length !== 0 && {
    title: "Did you know?",
    preview: knowMoreData.body,
    data: {
      didYouKnow: knowMoreData.body,
      sources: knowMoreData.sources,
    },
  };

  const sectionData = {
    knowMore: {
      title: "",
      preview: "",
      data: {
        didYouKnow: "",
        sources: [{ url: "", title: "" }],
      },
    },
    comments: {
      title: "Comments",
      preview: commentsList
        ? topComment
          ? topComment
          : "No one has commented. Be the first."
        : "☹ Couldn't load comments",
      data: commentsList,
    },
  };

  if (knowMoreSection) sectionData.knowMore = knowMoreSection;

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
    refreshComments();
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
          display={section[1].title === "" ? "none" : "flex"}
        >
          <Divider borderWidth="1px" />
          <HStack justifyContent="space-between" w="98%">
            <VStack alignItems="flex-start" px="2%" w="90%">
              <Heading as="h5" variant="headline">
                {section[1].title}
              </Heading>
              <Text
                variant="caption"
                color="grayscale.gray.100"
                isTruncated
                maxWidth="90%"
              >
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
        <KnowMoreDrawer data={knowMoreData} onClose={closeKnowMore} />
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
            onClose={closeComments}
            refreshComments={refreshComments}
            questionData={questionData}
          />
        </Drawer>
      )}
    </VStack>
  );
};

export default Sections;

import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import AlertModal from "components/AlertModal";
import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { ICommentsList, IReply } from "types/shared";
import { useAuth } from "utils/auth/AuthProvider";
import ReportInput from "./ReportInput";

export interface IMoreMenu {
  comment: ICommentsList | IReply;
  reportUserComment: (comment: ICommentsList | IReply) => void;
  deleteUserComment: (comment: ICommentsList | IReply) => void;
  reportRef: React.MutableRefObject<HTMLInputElement>;
}

const MoreMenu = ({
  reportUserComment,
  deleteUserComment,
  comment,
  reportRef,
}: IMoreMenu) => {
  const modalButtonStyles = {
    variant: "naked",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    px: 0,
    fontSize: "16px",
    color: "white",
    py: 0,
  };
  const { user } = useAuth();

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="none"
        _active={{ bg: "none" }}
        _focus={{ bg: "none" }}
        _hover={{ bg: "none" }}
      >
        <AiOutlineMore />
      </MenuButton>
      <MenuList bg="grayscale.gray.300">
        <MenuItem _focus={{ bg: "rgba(255,255,255,0.08)" }}>
          <AlertModal
            header="Report comment"
            buttonText="Report"
            buttonProps={{ ...modalButtonStyles }}
            onButtonClick={() => reportUserComment(comment)}
            alertBody={
              <ReportInput
                inputRef={reportRef}
                placeholder="Your reason"
                username={comment.user.displayName}
              />
            }
            // message={`Are you sure you want to report ${comment.user.displayName}?`}
          />
        </MenuItem>
        {user && comment.user.uid === user.uid && (
          <MenuItem>
            <AlertModal
              header="Delete comment"
              buttonText="Delete"
              buttonProps={{ ...modalButtonStyles }}
              onButtonClick={() => deleteUserComment(comment)}
            />
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MoreMenu;

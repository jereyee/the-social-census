import axios from "axios";
import { ICommentsList, IReply } from "types/shared";
import { getEndpoint, APIEndpoints, getHeaders } from "../functions";

export const deleteComment = ({
  questionId,
  comment,
  token,
}: {
  questionId: number;
  comment: ICommentsList | IReply;
  token: string;
}) => {
  const deleteUserComment = async (token: string) => {
    const endpoint = getEndpoint(
      APIEndpoints.DELETE_QUESTION_COMMENT,
      questionId,
      comment.id
    );
    const res = await axios.delete(`${endpoint}`, {
      headers: getHeaders(token),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return res.data.value;
  };

  return deleteUserComment(token);
};

import axios from "axios";
import { IUserComment } from "types/shared";
import { getEndpoint, APIEndpoints, getHeaders } from "../functions";

export const submitQuestion = ({
  questionId,
  responses,
  token,
}: {
  questionId: number;
  responses: number[];
  token: string;
}) => {
  const payload = responses.map((response) => {
    return {
      optionId: response,
    };
  });
  const submitResponse = async (token: string) => {
    const res = await axios.post(
      `${getEndpoint(APIEndpoints.SEND_RESPONSE_FOR_QUESTION, questionId)}`,
      {
        responses: payload,
      },
      {
        headers: getHeaders(token),
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return res.data.value;
  };

  return submitResponse(token);
};

export const submitComment = ({
  questionId,
  comment,
  token,
}: {
  questionId: number;
  comment: IUserComment;
  token: string;
}) => {
  const payload = comment;
  const submitUserComment = async (token: string) => {
    const res = await axios.post(
      `${getEndpoint(APIEndpoints.CREATE_QUESTION_COMMENT, questionId)}`,
      {
        value: payload,
      },
      {
        headers: getHeaders(token),
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return res.data.value;
  };

  return submitUserComment(token);
};

export const likeOrUnlikeComment = ({
  questionId,
  commentId,
  token,
  like,
}: {
  questionId: number;
  commentId: number;
  token: string;
  like: boolean;
}) => {
  const submitUserLike = async (token: string) => {
    const endpoint = getEndpoint(
      like ? APIEndpoints.LIKE_COMMENT : APIEndpoints.UNLIKE_COMMENT,
      questionId,
      commentId
    );
    const headers = getHeaders(token);
    const res = like
      ? await axios.post(
          `${endpoint}`,
          { value: {} },
          {
            headers: headers,
          }
        )
      : await axios.delete(`${endpoint}`, {
          headers: headers,
        });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return res.data.value;
  };

  return submitUserLike(token);
};

export const excludeOrUnexcludeQuestions = ({
  questionId,
  token,
  exclude,
}: {
  questionId: number;
  token: string;
  exclude: boolean;
}) => {
  const submitUserExclusion = async (token: string) => {
    const endpoint = getEndpoint(
      exclude
        ? APIEndpoints.SET_MATCH_EXCLUSIONS
        : APIEndpoints.DELETE_MATCH_EXCLUSIONS
    );
    const headers = getHeaders(token);
    const res = exclude
      ? await axios.post(
          `${endpoint}`,
          {
            value: {
              questionId: questionId,
            },
          },
          {
            headers: headers,
          }
        )
      : await axios.delete(`${endpoint}`, {
          headers: headers,
          data: {
            value: {
              questionId: questionId,
            },
          },
        });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return res.data.value;
  };

  return submitUserExclusion(token);
};

export const reportComment = ({
  questionId,
  commentId,
  token,
  reason,
}: {
  questionId: number;
  commentId: number;
  token: string;
  reason: string;
}) => {
  const payload = {
    reason: reason,
  };
  const submitUserReport = async (token: string) => {
    const endpoint = getEndpoint(
      APIEndpoints.REPORT_COMMENT,
      questionId,
      commentId
    );
    const res = await axios.post(
      `${endpoint}`,
      {
        value: payload,
      },
      {
        headers: getHeaders(token),
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return res.data.value;
  };

  return submitUserReport(token);
};

export const matchWithFriendCode = ({
  matchCode,
  token,
}: {
  matchCode: string;
  token: string;
}) => {
  const payload = { matchCode: matchCode };
  const submitMatchCode = async (token: string) => {
    const res = await axios.post(
      `${getEndpoint(APIEndpoints.MATCH_WITH_CODE)}`,
      {
        value: payload,
      },
      {
        headers: getHeaders(token),
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return res.data.value;
  };

  return submitMatchCode(token);
};

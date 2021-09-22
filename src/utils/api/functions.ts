
export const getHeaders = (token: string) => {
  return {
    Authorization: "Bearer " + token,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": " Origin, Content-Type, X-Auth-Token",
  };
};

export enum APIMethods {
  GET,
  POST,
  PATCH,
  PUT,
  DELETE,
  OPTIONS,
}

export enum APIEndpoints {
  DELETE_ACCOUNT,
  LIST_QUESTIONS,
  GET_QUESTION,
  SEND_RESPONSE_FOR_QUESTION,
  GET_QUESTION_STATISTICS,
  GET_QUESTION_COMMENTS,
  CREATE_QUESTION_COMMENT,
  DELETE_QUESTION_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  REPORT_COMMENT,
  UNREPORT_COMMENT,
  GET_MATCH_CODE,
  MATCH_WITH_CODE,
  GET_MATCH_HISTORY,
  GET_MATCH_REPORT,
  DELETE_MATCH,
  LIST_MATCH_EXCLUSIONS,
  SET_MATCH_EXCLUSIONS,
  DELETE_MATCH_EXCLUSIONS,
}

export const getEndpoint = (
  endpointType: APIEndpoints,
  questionId?: number,
  commentId?: number,
  matchId?: number
) => {
  let endpoint = "";
  const baseURL = "https://api.social-census.com/v1.0";

  switch (endpointType) {
    case APIEndpoints.DELETE_ACCOUNT:
      endpoint = `${baseURL}/account`;
      break;
    case APIEndpoints.LIST_QUESTIONS:
      endpoint = `${baseURL}/questions`;
      break;
    case APIEndpoints.GET_QUESTION:
      if (questionId) endpoint = `${baseURL}/questions/${questionId}`;
      break;
    case APIEndpoints.SEND_RESPONSE_FOR_QUESTION:
      if (questionId) endpoint = `${baseURL}/questions/${questionId}/responses`;
      break;
    case APIEndpoints.GET_QUESTION_STATISTICS:
      if (questionId)
        endpoint = `${baseURL}/questions/${questionId}/statistics`;
      break;
    case APIEndpoints.GET_QUESTION_COMMENTS:
    case APIEndpoints.CREATE_QUESTION_COMMENT:
    case APIEndpoints.DELETE_QUESTION_COMMENT:
      if (questionId) endpoint = `${baseURL}/questions/${questionId}/comments`;
      break;
    case APIEndpoints.LIKE_COMMENT:
    case APIEndpoints.UNLIKE_COMMENT:
      if (questionId && commentId)
        endpoint = `${baseURL}/questions/${questionId}/comments/${commentId}/likes`;
      break;
    case APIEndpoints.REPORT_COMMENT:
    case APIEndpoints.UNREPORT_COMMENT:
      if (questionId && commentId)
        endpoint = `${baseURL}/questions/${questionId}/comments/${commentId}/reports`;
      break;
    case APIEndpoints.GET_MATCH_CODE:
      endpoint = `${baseURL}/match/code`;
      break;
    case APIEndpoints.MATCH_WITH_CODE:
    case APIEndpoints.GET_MATCH_HISTORY:
      endpoint = `${baseURL}/match`;
      break;
    case APIEndpoints.GET_MATCH_REPORT:
    case APIEndpoints.DELETE_MATCH:
      if (matchId) endpoint = `${baseURL}/match/${matchId}`;
      break;
    case APIEndpoints.LIST_MATCH_EXCLUSIONS:
    case APIEndpoints.SET_MATCH_EXCLUSIONS:
    case APIEndpoints.DELETE_MATCH_EXCLUSIONS:
      endpoint = `${baseURL}/match/exclusions`;
      break;
    default:
      endpoint = "";
  }
  return endpoint;
};

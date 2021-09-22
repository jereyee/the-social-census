import axios, { AxiosError } from "axios";
import { IOptionStats } from "components/results/charts/poll/PollOption";
import { IQuestion } from "pages/home";
import { ICommentsList } from "pages/result";
import { getEndpoint, APIEndpoints, getHeaders } from "../functions";
import nookies from "nookies";

export const fetchQuestionComments = async (token: string, id: number) => {
  const endpoint = getEndpoint(APIEndpoints.GET_QUESTION_COMMENTS, id);
  const res = await axios.get(`${endpoint}`, {
    headers: getHeaders(token),
  });
  const data = res.data as { value: ICommentsList[] };
  return data.value.reverse();
};

export const fetchQuestionStatistics = async (
  token: string,
  questionId: number
) => {
  const res = await axios.get(
    `${getEndpoint(APIEndpoints.GET_QUESTION_STATISTICS, questionId)}`,
    {
      headers: getHeaders(token),
    }
  );
  const data = res.data as { value: IOptionStats[] };
  return data.value;
};

export const fetchQuestions = async (token: string) => {
  const res = await axios.get(`${getEndpoint(APIEndpoints.LIST_QUESTIONS)}`, {
    headers: getHeaders(token),
  });
  const data = res.data as { value: IQuestion[] };
  return data.value;
};

export const fetchOneQuestion = async (token: string, questionId: number) => {
  const res = await axios.get(
    `${getEndpoint(APIEndpoints.GET_QUESTION, questionId)}`,
    {
      headers: getHeaders(token),
    }
  );
  const data = res.data as { value: IQuestion };
  return data.value;
};

export interface IMatchCode {
  matchCode: string;
}

export const fetchMatchCode = async (token: string) => {
  const res = await axios.get(`${getEndpoint(APIEndpoints.GET_MATCH_CODE)}`, {
    headers: getHeaders(token),
  });
  const data = res.data as { value: IMatchCode };
  return data.value;
};

export interface IResponse {
  optionId: number;
  questionId: number;
  createdAt: string;
}

export interface IExclusion {
  uid: string;
  questionId: number;
}

interface ResponseError extends Error {
  status?: number;
}

export const fetcher = <T>(url: string, token: string) =>
  axios
    .get(url, { headers: getHeaders(token) })
    .then((res) => {
      return (res.data as { value: T }).value;
    });

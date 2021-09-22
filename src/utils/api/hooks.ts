import { IOptionStats } from "components/results/charts/poll/PollOption";
import nookies from "nookies";
import { IQuestion } from "pages/home";
import { ICommentsList } from "pages/result";
import { useCallback, useEffect, useState } from "react";
import {
  fetchMatchCode,
  fetchOneQuestion,
  fetchQuestionComments,
  fetchQuestions,
  fetchQuestionStatistics,
  IExclusion,
  IMatchCode,
  IResponse,
} from "./GET";

export const useQuestion = (questionId: number) => {
  const token = nookies.get(undefined, "token");

  const [question, setQuestion] = useState<IQuestion>();
  const [fetchSuccess, setFetchSuccess] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (token && fetchSuccess === undefined) {
      fetchOneQuestion(token.token, questionId)
        .then((data) => {
          setQuestion(data);
          setFetchSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setFetchSuccess(false);
        });
    }
  }, [fetchSuccess, token]);

  return {
    fetchSuccess: fetchSuccess,
    fetchedQuestion: question,
  };
};
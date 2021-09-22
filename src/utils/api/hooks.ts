import { IOptionStats } from "components/results/charts/poll/PollOption";
import nookies from "nookies";
import { IQuestion } from "pages/home";
import { ICommentsList } from "pages/result";
import { useEffect, useState } from "react";
import {
  fetchMatchCode,
  fetchQuestionComments,
  fetchQuestions,
  fetchQuestionStatistics,
  IMatchCode,
} from "./GET";

export const useQuestionsFetcher = () => {
  const token = nookies.get(undefined, "token");

  const [questionsList, setQuestionsList] = useState<IQuestion[]>([]);
  const [fetchSuccess, setFetchSuccess] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (token && fetchSuccess === undefined) {
      fetchQuestions(token.token)
        .then((data) => {
          setQuestionsList(data);
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
    fetchedQuestions: questionsList,
  };
};

export const useQuestionStatistics = ({
  questionId,
}: {
  questionId: number;
}) => {
  const token = nookies.get(undefined, "token");

  const [statistics, setStatistics] = useState<IOptionStats[]>([]);

  const isStatisticsFetched = statistics.length > 0;

  useEffect(() => {
    if (token && !isStatisticsFetched) {
      fetchQuestionStatistics(token.token, questionId)
        .then((data) => {
          setStatistics(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return {
    fetchSuccess: isStatisticsFetched,
    fetchedStatistics: statistics,
  };
};

export const useQuestionComments = ({ questionId }: { questionId: number }) => {
  const token = nookies.get(undefined, "token");

  const [comments, setComments] = useState<ICommentsList[]>([]);
  const [fetchSuccess, setFetchSuccess] = useState<boolean | undefined>(
    undefined
  );

  //const isCommentsFetched = comments.length > 0;

  useEffect(() => {
    if (token && fetchSuccess === undefined) {
      fetchQuestionComments(token.token, questionId)
        .then((data) => {
          setComments(data);
          setFetchSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setFetchSuccess(false);
        });
    }
  }, [token]);

  return {
    fetchSuccess: fetchSuccess,
    fetchedComments: comments,
  };
};

export const useMatchCode = () => {
  const token = nookies.get(undefined, "token");

  const [matchCode, setMatchCode] = useState<IMatchCode>();
  const [fetchSuccess, setFetchSuccess] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (token && fetchSuccess === undefined) {
      fetchMatchCode(token.token)
        .then((data) => {
          setMatchCode(data);
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
    fetchedMatchCode: matchCode,
  };
};

import nookies from "nookies";
import { useEffect, useState } from "react";
import { IQuestion } from "types/shared";
import { fetchOneQuestion } from "./GET";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSuccess, token]);

  return {
    fetchSuccess: fetchSuccess,
    fetchedQuestion: question,
  };
};

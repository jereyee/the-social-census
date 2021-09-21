import axios from "axios";
import { IQuestion } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import nookies from "nookies";

export const useQuestionsFetcher = () => {
  const token = nookies.get(undefined, "token");

  const [questionsList, setQuestionsList] = useState<IQuestion[]>([]);

  const isQuestionsFetched = questionsList.length > 0;

  const fetchQuestions = async (token: string) => {
    const res = await axios.get(
      "https://api.social-census.com/v1.0/questions",
      {
        withCredentials: false,
        headers: {
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": " Origin, Content-Type, X-Auth-Token",
        },
      }
    );
    const data = res.data as { value: IQuestion[] };
    return data.value;
  };

  useEffect(() => {
    if (token && !isQuestionsFetched) {
      fetchQuestions(token.token)
        .then((data) => {
          setQuestionsList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return {
    fetchSuccess: isQuestionsFetched,
    fetchedQuestions: questionsList,
  };
};

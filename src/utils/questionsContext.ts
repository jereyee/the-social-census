import React, { Dispatch, SetStateAction } from "react";

type UpdateType = Dispatch<SetStateAction<IQuestionState>>;

type IQuestionState = {
  lastIndex: number;
  questionId: number;
  knowMore: Record<string, unknown>;
  response: number[];
};

export const defaultState: IQuestionState = {
  lastIndex: 0,
  questionId: 0,
  knowMore: {},
  response: [],
};

const defaultUpdate: UpdateType = () => {
  return { lastIndex: 0 };
};

const QuestionsContext = React.createContext({
  questionState: defaultState,
  updateQuestionState: defaultUpdate,
});
export const QuestionsProvider = QuestionsContext.Provider;
export default QuestionsContext;

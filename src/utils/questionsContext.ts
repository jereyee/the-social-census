import { IQuestionData, QuestionType } from "components/questions/Questions";
import React, { Dispatch, SetStateAction } from "react";

type UpdateType = Dispatch<SetStateAction<IQuestionState>>;

interface IQuestionState extends IQuestionData {
  lastIndex: number;
  shared: boolean;
  response: number[];
}

export const defaultState: IQuestionState = {
  lastIndex: 0,
  shared: false,
  id: 1,
  body: "Would you marry someone from a different race?",
  category: "race",
  type: QuestionType.BINARY,
  knowMore: {},
  response: [],
  createdAt: "",
  options: [],
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

export interface IResponse {
  optionId: number;
  questionId: number;
  createdAt: string;
}

export interface IExclusion {
  uid: string;
  questionId: number;
}

export interface IMatchCode {
  matchCode: string;
}

export interface IReply {
  id: number;
  questionId: number;
  uid: string;
  parentId: number;
  body: string;
  createdAt: string;
  likes: number;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  responses: number[];
}

export interface ICommentsList {
  id: number;
  questionId: number;
  parentId: null;
  body: string;
  createdAt: string;
  likes: number;
  children: IReply[];
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  userResponses: number[];
}

export interface IUserComment {
  body: string;
  parentId: null | number;
}

export interface IQuestion {
  id: number;
  body: string;
  category: string;
  type: QuestionType;
  knowMore: Record<string, unknown>;
  createdAt: string;
  options: {
    id: number;
    questionId: number;
    body: string;
  }[];
}

export interface MatchHistory {
  matches: Match[];
}

export interface Match {
  id: number;
  uid: string;
  otherUid: string;
  createdAt: string;
  matchedAt: string;
  user: UserObject;
  otherUser: UserObject;
}

export interface MatchCardData {
  user1: Array<IReportResponse[]>;
  user2: Array<IReportResponse[]>;
}

export interface IReport {
  matchReport: MatchReport;
}

export interface MatchReport {
  matchPercentage: string;
  sameResponses: Array<IReportResponse[]>;
  differentResponses1: Array<IReportResponse[]>;
  differentResponses2: Array<IReportResponse[]>;
  user: UserObject;
  otherUser: UserObject;
}

export interface UserObject {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface IReportResponse {
  uid: string;
  optionId: number;
  questionId: number;
  createdAt: string;
}

export interface IKnowMore {
  body: string;
  sources: {
    url: string;
    title: string;
  }[];
}

export interface IComments {
  onClose: () => void;
  refreshComments: () => void;
  questionData: IQuestion;
}

export interface IOptionStats {
  id: number;
  questionId?: number;
  body: string;
  responses: number;
  percent?: number;
}

export enum QuestionType {
  BINARY = "BINARY",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  MULTIPLE_RESPONSE = "MULTIPLE_RESPONSE",
  SCALE = "SCALE",
}

export interface IOptionData {
  id: number;
  questionId: number;
  body: string;
}

export interface IQuestionData {
  id: number;
  body: string;
  category: string;
  type: QuestionType;
  knowMore: Record<string, unknown>;
  createdAt: string;
  options: IOptionData[];
}

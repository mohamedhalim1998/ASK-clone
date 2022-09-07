import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiCall } from "./ApiMiddleware";
import { RootState } from "./Store";
export interface Question {
  id: string;
  question: string;
  answer: string;
  date: number;
  from: string;
  fromUsername: string;
  fromProfileImage: string;
}

export interface InboxState {
  loadingQuestions: boolean;
  questions: Question[];
}
const initState: InboxState = {
  loadingQuestions: false,
  questions: [],
};
export const updateQuestionList =
  createAction<Question[]>("updateQuestionList");
export const updateLoadingQuestions = createAction<boolean>(
  "updateLoadingQuestions"
);
export const addQuestion = (
  question: string,
  to: string,
  anonymously: boolean
) =>
  apiCall({
    url: "http://localhost:8080/question/add",
    method: "POST",
    useJwtToken: true,
    body: {
      question,
      to,
      anonymously,
    },
  });

export const getAllQuestions = () =>
  apiCall({
    url: "http://localhost:8080/question",
    useJwtToken: true,
    onSuccess: updateQuestionList.toString(),
  });

export const answerQuestion = (id: string, answer: string) =>
  apiCall({
    url: `http://localhost:8080/question/addanswer/${id}`,
    useJwtToken: true,
    method: "POST",
    body: {
      answer,
    },
  });

export const questionSelector = (id: string) =>
  createSelector(
    (state: RootState) => state.inbox.questions,
    (questions: Question[]) =>
      questions.filter((question) => question.id === id)[0]
  );

export default createReducer<InboxState>(initState, {
  [updateQuestionList.type]: (state, action: PayloadAction<AxiosResponse>) => {
    state.loadingQuestions = false;
    state.questions = action.payload.data;
  },
  [updateLoadingQuestions.type]: (state, action: PayloadAction<boolean>) => {
    state.loadingQuestions = action.payload;
  },
});

import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import Question from "../model/Question";
import { apiCall } from "./ApiMiddleware";
import { showErrorToast } from "./AuthReducer";
import { RootState } from "./Store";

export interface InboxState {
  loadingQuestions: boolean;
  loadMore: boolean;
  questions: Question[];
}
const initState: InboxState = {
  loadingQuestions: false,
  loadMore: false,
  questions: [],
};
export const updateQuestionList =
  createAction<Question[]>("updateQuestionList");
export const appendQuestionList =
  createAction<Question[]>("appendQuestionList");
export const addQuestionToList = createAction<Question[]>("addQuestionToList");
export const updateLoadingQuestions = createAction<boolean>(
  "updateLoadingQuestions"
);
export const updateLoadMoreQuestions = createAction<boolean>(
  "updateLoadMoreQuestions"
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
export const addQuestionToListUsers = (
  question: string,
  to: string[],
  anonymously: boolean
) =>
  apiCall({
    url: "http://localhost:8080/question/add/tolist",
    method: "POST",
    useJwtToken: true,
    body: {
      question: {
        question,
        anonymously,
      },
      to,
    },
  });
export const addFollowUpQuestion = (
  question: string,
  to: string,
  anonymously: boolean,
  mainQuestionId: number
) =>
  apiCall({
    url: "http://localhost:8080/question/add/followup",
    method: "POST",
    useJwtToken: true,
    body: {
      question,
      to,
      anonymously,
      mainQuestionId,
    },
  });

export const deleteQuestion = (id: number) =>
  apiCall({
    url: "http://localhost:8080/question/delete/".concat(id.toString()),
    method: "DELETE",
    useJwtToken: true,
    onSuccess: getAllQuestions(),
  });
export const deleteAllQuestions = () =>
  apiCall({
    url: "http://localhost:8080/question/delete",
    method: "DELETE",
    useJwtToken: true,
    onSuccess: getAllQuestions(),
  });

export const getAllQuestions = (page: number = 0) =>
  apiCall({
    url: `http://localhost:8080/question?page=${page}`,
    useJwtToken: true,
    onSuccess:
      page === 0
        ? updateQuestionList.toString()
        : appendQuestionList.toString(),
  });
export const getQuestion = (id: number) =>
  apiCall({
    url: `http://localhost:8080/question/${id}`,
    useJwtToken: true,
    onSuccess: addQuestionToList.toString(),
    onError: showErrorToast.toString(),
  });

export const answerQuestion = (
  question: Question,
  answer: string,
  answerImage: FileList
) => {
  const blob = new Blob([JSON.stringify({ answer, question })], {
    type: "application/json",
  });
  const data = new FormData();
  data.append("answer", blob);
  if (answerImage !== undefined) data.append("answerImage", answerImage[0]);

  return apiCall({
    url: `http://localhost:8080/answer`,
    useJwtToken: true,
    method: "POST",
    onSuccess: getAllQuestions(),
    body: data,
  });
};

export const questionSelector = (id: number) =>
  createSelector(
    (state: RootState) => state.inbox.questions,
    (questions: Question[]) =>
      questions.filter((question) => question.id === id)[0]
  );

export default createReducer<InboxState>(initState, {
  [updateQuestionList.type]: (state, action: PayloadAction<AxiosResponse>) => {
    state.loadingQuestions = false;
    state.loadMore = false;
    state.questions = action.payload.data;
  },
  [appendQuestionList.type]: (state, action: PayloadAction<AxiosResponse>) => {
    state.loadMore = false;
    state.questions = state.questions.concat(action.payload.data);
  },
  [addQuestionToList.type]: (state, action: PayloadAction<AxiosResponse>) => {
    state.loadingQuestions = false;
    state.questions = [...state.questions].concat(action.payload.data);
  },
  [updateLoadingQuestions.type]: (state, action: PayloadAction<boolean>) => {
    state.loadingQuestions = action.payload;
  },
  [updateLoadMoreQuestions.type]: (state, action: PayloadAction<boolean>) => {
    state.loadMore = action.payload;
  },
});

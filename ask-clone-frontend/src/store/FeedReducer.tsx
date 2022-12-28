import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Answer } from "../model/Answer";
import { apiCall } from "./ApiMiddleware";
import { RootState } from "./Store";

export interface FeedState {
  loading: boolean;
  loadMore: boolean;
  answers: Answer[];
}

export const updateFeedAnswers =
  createAction<AxiosResponse>("updateFeedAnswers");
export const appendMoreAnswers =
  createAction<AxiosResponse>("appendMoreAnswers");
export const updateFeedLoading = createAction<boolean>("updateFeedLoading");
export const updateFeedLoadMore = createAction<boolean>("updateFeedLoadMore");

export const getFeedAnswers = (page: number = 0) => {
  return apiCall({
    url: `http://localhost:8080/feed?page=${[page]}`,
    useJwtToken: true,
    onSuccess:
      page === 0 ? updateFeedAnswers.toString() : appendMoreAnswers.toString(),
  });
};
export const getAnswer = (id: number) =>
  apiCall({
    url: "http://localhost:8080/answer/".concat(id.toString()),
    useJwtToken: true,
    onSuccess: updateFeedAnswers.toString(),
  });

export const getUserAnswers = (username: string, page: number = 0) =>
  apiCall({
    url: `http://localhost:8080/feed/user/${username}?page=${[page]}`,
    useJwtToken: true,
    onSuccess:
    page === 0 ? updateFeedAnswers.toString() : appendMoreAnswers.toString(),
  });
export const selectAnswerById = (id: number) =>
  createSelector(
    (state: RootState) => state.feed.answers,
    (answers: Answer[]) => answers.filter((answer) => answer.id === id)[0]
  );

const initState: FeedState = {
  loading: false,
  loadMore: false,
  answers: [],
};

export default createReducer<FeedState>(initState, {
  [updateFeedAnswers.type]: (state, action: PayloadAction<AxiosResponse>) => {
    state.loading = false;
    state.answers = action.payload.data;
  },
  [appendMoreAnswers.type]: (state, action: PayloadAction<AxiosResponse>) => {
    state.loadMore = false;
    state.answers = state.answers.concat(action.payload.data);
  },
  [updateFeedLoading.type]: (state, action) => {
    state.loading = action.payload;
  },
  [updateFeedLoadMore.type]: (state, action) => {
    state.loadMore = action.payload;
  },
});

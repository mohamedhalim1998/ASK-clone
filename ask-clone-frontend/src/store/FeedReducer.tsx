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
  answers: Answer[];
}

export const updateFeedAnswers =
  createAction<AxiosResponse>("updateFeedAnswers");
export const updateFeedLoading = createAction<boolean>("updateFeedLoading");

export const getFeedAnswers = () =>
  apiCall({
    url: "http://localhost:8080/feed",
    useJwtToken: true,
    onSuccess: updateFeedAnswers.toString(),
  });
export const getAnswer = (id: number) =>
  apiCall({
    url: "http://localhost:8080/answer/".concat(id.toString()),
    useJwtToken: true,
    onSuccess: updateFeedAnswers.toString(),
  });

export const getUserAnswers = (username: string) =>
  apiCall({
    url: `http://localhost:8080/feed/user/${username}`,
    useJwtToken: true,
    onSuccess: updateFeedAnswers.toString(),
  });
export const selectAnswerById = (id: number) =>
  createSelector(
    (state: RootState) => state.feed.answers,
    (answers: Answer[]) => answers.filter((answer) => answer.id === id)[0]
  );

const initState: FeedState = {
  loading: false,
  answers: [],
};

export default createReducer<FeedState>(initState, {
  [updateFeedAnswers.type]: (state, action: PayloadAction<AxiosResponse>) => {
    state.loading = false;
    state.answers = action.payload.data;
  },
  [updateFeedLoading.type]: (state, action) => {
    state.loading = action.payload;
  },
});

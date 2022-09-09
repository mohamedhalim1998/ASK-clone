import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import Question from "../model/Question";
import { apiCall } from "./ApiMiddleware";

export interface FeedState {
  loading: boolean;
  answers: Question[];
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

export const getUserAnswers = (username: string) =>
  apiCall({
    url: `http://localhost:8080/feed/user/${username}`,
    useJwtToken: true,
    onSuccess: updateFeedAnswers.toString(),
  });

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

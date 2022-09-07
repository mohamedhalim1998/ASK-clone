import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ProfileInfo } from "../pages/Settings";
import { apiCall } from "./ApiMiddleware";
import { Question } from "./InboxReduer";

export const updateProfileState = createAction("updateProfileState");
export const showErrorToast = createAction<boolean>("showErrorToast");
export const updateProfileLoading = createAction<boolean>(
  "updateProfileLoading"
);

export const getProfileInfo = () =>
  apiCall({
    url: "http://localhost:8080/profile",
    method: "GET",
    useJwtToken: true,
    onSuccess: updateProfileState.toString(),
    onError: showErrorToast.toString(),
  });

export const changeSettings = (profileInfo: ProfileInfo) => {
  const blob = new Blob([JSON.stringify({ ...profileInfo })], {
    type: "application/json",
  });
  const data = new FormData();
  data.append("profile", blob);
  data.append("profileImage", profileInfo.profileImage![0]);
  data.append("coverImage", profileInfo.coverImage![0]);
  return apiCall({
    url: "http://localhost:8080/profile/update",
    method: "POST",
    useJwtToken: true,
    body: data,
    onSuccess: getProfileInfo.toString(),
  });
};

export const changeStatus = (status: boolean) =>
  apiCall({
    url: "http://localhost:8080/profile/update/status",
    body: {
      status,
    },
    method: "POST",
    useJwtToken: true,
    onSuccess: updateProfileState.toString(),
  });

export interface ProfileState {
  username: string;
  fullname: string;
  location: string;
  bio: string;
  links: string;
  day: number;
  month: number;
  year: number;
  allowAnoymousQuestions: boolean;
  profileImageUrl: string;
  coverImageUrl: string;
  status: true;
  gender: string;
  loading: boolean;
  answers: Question[];
  followersCount: number;
  likesCount: number;
  postsCount: number;
}

const initState = {
  username: "",
  fullname: "",
  location: "",
  bio: "",
  links: "",
  day: 0,
  month: 0,
  year: 0,
  allowAnoymousQuestions: true,
  profileImageUrl: "",
  coverImageUrl: "",
  status: true,
  gender: "MALE",
  followersCount: 0,
  likesCount: 0,
  postsCount: 0,
} as ProfileState;
export default createReducer(initState, {
  [updateProfileState.type]: (
    state: ProfileState,
    action: PayloadAction<AxiosResponse>
  ) => {
    console.log("update profile info");
    Object.assign(state, action.payload.data);
    state.postsCount = state.answers.length;
    state.loading = false;
  },
  [updateProfileLoading.type]: (
    state: ProfileState,
    action: PayloadAction<boolean>
  ) => {
    state.loading = action.payload;
  },
});

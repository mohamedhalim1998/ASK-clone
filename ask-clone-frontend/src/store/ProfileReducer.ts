import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ProfileInfo } from "../pages/Settings";
import { apiCall } from "./ApiMiddleware";

export const updateProfileState = createAction("updateProfileState");
export const showErrorToast = createAction<boolean>("showErrorToast");
export const updateLoading = createAction<boolean>("updateLoading");

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
  });
};

export interface ProfileState {
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
}

const initState = {
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
} as ProfileState;
export default createReducer(initState, {
  [updateProfileState.type]: (
    state: ProfileState,
    action: PayloadAction<AxiosResponse>
  ) => {
    console.log("update profile info");
    Object.assign(state, action.payload.data);
    state.loading = false;
  },
  [updateLoading.type]: (
    state: ProfileState,
    action: PayloadAction<boolean>
  ) => {
    state.loading = action.payload;
  },
});

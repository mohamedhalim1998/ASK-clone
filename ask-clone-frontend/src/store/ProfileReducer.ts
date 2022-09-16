import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Profile } from "../model/Profile";
import { ProfileInfo } from "../pages/Settings";
import { apiCall } from "./ApiMiddleware";

export const updateProfileState = createAction("updateProfileState");
export const updateGuestState = createAction("updateGuestState");
export const showErrorToast = createAction<boolean>("showErrorToast");
export const updateProfileLoading = createAction<boolean>(
  "updateProfileLoading"
);
export const updateGuestLoading = createAction<boolean>("updateGuestLoading");

export const getProfileInfo = (username?: string) =>
  apiCall({
    url: "http://localhost:8080/profile".concat(
      username ? "/".concat(username) : ""
    ),
    method: "GET",
    useJwtToken: true,
    onSuccess: username
      ? updateGuestState.toString()
      : updateProfileState.toString(),
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

export const followUser = (username: string) =>
  apiCall({
    url: `http://localhost:8080/profile/${username}/follow`,
    method: "POST",
    onSuccess: updateGuestState.toString(),
    useJwtToken: true,
  });

export const unfollowUser = (username: string) =>
  apiCall({
    url: `http://localhost:8080/profile/${username}/unfollow`,
    method: "POST",
    onSuccess: updateGuestState.toString(),
    useJwtToken: true,
  });

export interface ProfileState {
  loading: boolean;
  profile: Profile;
  guest: Profile;
  guestLoading: boolean;
}

const initState = {
  profile: {
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
  } as Profile,
  guest: {
    guest: true,
    username: "",
    fullname: "",
    location: "",
    bio: "",
    links: "",
    allowAnoymousQuestions: true,
    profileImageUrl: "",
    coverImageUrl: "",
    status: true,
    gender: "MALE",
    followersCount: 0,
    likesCount: 0,
    follow: false,
  } as Profile,
} as ProfileState;
export default createReducer(initState, {
  [updateProfileState.type]: (
    state: ProfileState,
    action: PayloadAction<AxiosResponse>
  ) => {
    console.log("update profile info");
    Object.assign(state.profile, action.payload.data);
    state.loading = false;
  },
  [updateGuestState.type]: (
    state: ProfileState,
    action: PayloadAction<AxiosResponse>
  ) => {
    console.log("update profile info");
    Object.assign(state.guest, action.payload.data);
    state.loading = false;
    state.guestLoading = false;
  },
  [updateProfileLoading.type]: (
    state: ProfileState,
    action: PayloadAction<boolean>
  ) => {
    state.loading = action.payload;
  },
});

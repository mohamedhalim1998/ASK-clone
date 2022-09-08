import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Profile } from "../model/Profile";
import { ProfileInfo } from "../pages/Settings";
import { apiCall } from "./ApiMiddleware";

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
  loading: boolean;
  profile: Profile;
}

const initState = {} as ProfileState;
export default createReducer(initState, {
  [updateProfileState.type]: (
    state: ProfileState,
    action: PayloadAction<AxiosResponse>
  ) => {
    console.log("update profile info");
    Object.assign(state.profile, action.payload.data);
    state.loading = false;
  },
  [updateProfileLoading.type]: (
    state: ProfileState,
    action: PayloadAction<boolean>
  ) => {
    state.loading = action.payload;
  },
});

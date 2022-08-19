import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiCall } from "./ApiMiddleware";

export const updateGuestState = createAction("updateGuestState");
export const updateGuestLoading = createAction<boolean>("updateGuestLoading");
export const getGuestInfo = (username: string) =>
  apiCall({
    url: `http://localhost:8080/profile/${username}`,
    onSuccess: updateGuestState.toString(),
    useJwtToken: true,
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

export interface GuestState {
  username: string;
  fullname: string;
  location: string;
  bio: string;
  links: string;
  profileImageUrl: string;
  coverImageUrl: string;
  loading: boolean;
  followersCount: number;
  likesCount: number;
  postsCount: number;
  follow: boolean;
}

const initState: GuestState = {
  username: "",
  fullname: "",
  location: "",
  bio: "",
  links: "",
  profileImageUrl: "",
  coverImageUrl: "",
  loading: false,
  followersCount: 0,
  likesCount: 0,
  postsCount: 0,
  follow: false,
};

export default createReducer<GuestState>(initState, {
  [updateGuestState.type]: (state, action: PayloadAction<AxiosResponse>) => {
    Object.assign(state, action.payload.data);
    state.loading = false;
  },
  [updateGuestLoading.type]: (state, action: PayloadAction<boolean>) => {
    state.loading = action.payload;
  },
});

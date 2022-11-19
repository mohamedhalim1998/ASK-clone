import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Friend } from "../model/Friend";
import { apiCall } from "./ApiMiddleware";
import { RootState } from "./Store";

export const updateFriendsList =
  createAction<AxiosResponse>("updateFriendsList");
export const updateOtherUsersList = createAction<AxiosResponse>(
  "updateOtherUsersList"
);
export const updateFriendsLoading = createAction<boolean>(
  "updateFriendsLoading"
);
export const getFriends = () => {
  return apiCall({
    url: "http://localhost:8080/friends",
    useJwtToken: true,
    onSuccess: updateFriendsList.toString(),
  });
};
export const searchFriends = (query: string) => {
  return apiCall({
    url: `http://localhost:8080/profile/search?query=${query}`,
    useJwtToken: true,
    onSuccess: updateOtherUsersList.toString(),
  });
};

export const friendSelector = (username: string) =>
  createSelector(
    (state: RootState) => state.friends.friends,
    (friends: Friend[]) =>
      friends.filter((friend) => friend.username === username)[0]
  );

interface FriendsState {
  friends: Friend[];
  otherUsers: Friend[];
  loading: boolean;
}
const initState: FriendsState = {
  friends: [],
  otherUsers: [],
  loading: true,
};
export default createReducer<FriendsState>(initState, {
  [updateFriendsList.type]: (state, action: PayloadAction<AxiosResponse>) => {
    console.log("get friends");
    state.friends = action.payload.data;
    state.loading = false;
  },
  [updateOtherUsersList.type]: (
    state,
    action: PayloadAction<AxiosResponse>
  ) => {
    console.log("get friends");
    state.otherUsers = action.payload.data;
    state.loading = false;
  },
  [updateFriendsLoading.type]: (state, action: PayloadAction<boolean>) => {
    state.loading = action.payload;
  },
});

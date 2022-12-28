import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiCall } from "./ApiMiddleware";
import { getProfileInfo } from "./ProfileReducer";

export const updateNotifactionsList = createAction<AxiosResponse>(
  "updateNotifactionsList"
);

export const updateLoadingNotifications = createAction<boolean>(
  "updateLoadingNotifications"
);

export const updateLoadMoreNotifications = createAction<boolean>(
  "updateLoadMoreNotifications"
);
export const appendMoreNotifications =
  createAction<AxiosResponse>("appendMoreNotifications");

export const addNotification = createAction<Notification>("addNotification");
export const markAllAsRead = () =>
  apiCall({
    url: "http://localhost:8080/notification",
    method: "POST",
    useJwtToken: true,
    onSuccess: getProfileInfo(),
  });

export const getNotifications = (page: number = 0) => {
  return apiCall({
    url: `http://localhost:8080/notification?page=${[page]}`,
    useJwtToken: true,
    onSuccess: page === 0 ? updateNotifactionsList.toString() : appendMoreNotifications.toString(),
  });
};

export interface NotificationState {
  loadingNotifications: boolean;
  loadMore: boolean;
  notifications: Notification[];
}
export default createReducer<NotificationState>(
  {
    loadingNotifications: true,
    loadMore: false,
    notifications: [],
  },
  {
    [updateNotifactionsList.type]: (
      state,
      action: PayloadAction<AxiosResponse>
    ) => {
      state.loadingNotifications = false;
      state.loadMore = false;
      state.notifications = action.payload.data;
    },
    [appendMoreNotifications.type]: (
      state,
      action: PayloadAction<AxiosResponse>
    ) => {
      state.loadingNotifications = false;
      state.loadMore = false;
      state.notifications = state.notifications.concat(action.payload.data);
    },
    [addNotification.type]: (state, action: PayloadAction<Notification>) => {
      state.loadingNotifications = false;
      state.notifications.unshift(action.payload);
    },
    [updateLoadingNotifications.type]: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loadingNotifications = action.payload;
    },
    [updateLoadMoreNotifications.type]: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loadMore = action.payload;
    },
  }
);

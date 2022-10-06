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

export const addNotification = createAction<Notification>("addNotification");
export const markAllAsRead = () =>
  apiCall({
    url: "http://localhost:8080/notification",
    method: "POST",
    useJwtToken: true,
    onSuccess: getProfileInfo(),
  });

export const getAllNotification = () => {
  return apiCall({
    url: "http://localhost:8080/notification",
    useJwtToken: true,
    onSuccess: updateNotifactionsList.toString(),
  });
};

export interface NotificationState {
  loadingNotifications: boolean;
  notifications: Notification[];
}
export default createReducer<NotificationState>(
  {
    loadingNotifications: true,
    notifications: [],
  },
  {
    [updateNotifactionsList.type]: (
      state,
      action: PayloadAction<AxiosResponse>
    ) => {
      state.loadingNotifications = false;
      state.notifications = action.payload.data;
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
  }
);

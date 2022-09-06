import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { apiCall } from "./ApiMiddleware";

interface AuthState {
  verified?: boolean;
  loading: boolean;
}

export const saveJwtTokenFromResponse = createAction<any>(
  "saveJwtTokenFromResponse"
);
export const setTokenUnverified = createAction<boolean>("setTokenUnverified");
export const setTokenVerified = createAction<boolean>("setTokenVerified");
export const showErrorToast = createAction<boolean>("showErrorToast");
export const updateAuthLoading = createAction<boolean>("updateAuthLoading");
export const login = (username: string, password: string) =>
  apiCall({
    url: "http://localhost:8080/user/login",
    onSuccess: saveJwtTokenFromResponse.toString(),
    onError: showErrorToast.toString(),
    method: "POST",
    body: {
      username,
      password,
    },
  });
export const verifyToken = () =>
  apiCall({
    url: "http://localhost:8080/user/verify",
    method: "GET",
    useJwtToken: true,
    onSuccess: setTokenVerified.toString(),
    onError: setTokenUnverified.toString(),
  });

export const signup = (username: string, password: string, email: string) =>
  apiCall({
    url: "http://localhost:8080/user/signup",
    onSuccess: saveJwtTokenFromResponse.toString(),
    onError: showErrorToast.toString(),
    method: "POST",
    body: {
      username,
      password,
      email,
    },
  });
const initState: AuthState = {
  loading: false,
};
export default createReducer(initState, {
  [saveJwtTokenFromResponse.type]: (
    state: AuthState,
    action: PayloadAction<any>
  ) => {
    console.log(action.payload.headers);
    const token = "access_token" as keyof typeof action.payload.headers;
    Cookies.set("access_token", action.payload.headers[token]);
    state.verified = true;
    state.loading = false;
  },
  [setTokenUnverified.type]: (state: AuthState, action: PayloadAction<any>) => {
    state.verified = false;
    state.loading = false;
  },
  [setTokenVerified.type]: (state: AuthState, action: PayloadAction<any>) => {
    state.verified = true;
    state.loading = false;
  },
  [showErrorToast.type]: (state: AuthState, action: PayloadAction<any>) => {
    toast.error(action.payload.data["error"]);
  },
  [updateAuthLoading.type]: (
    state: AuthState,
    action: PayloadAction<boolean>
  ) => {
    state.loading = action.payload;
  },
});

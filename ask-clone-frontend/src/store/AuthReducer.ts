import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { apiCall } from "./ApiMiddleware";

interface AuthState {
  token: string;
  verified: boolean;
}

export const saveJwtTokenFromResponse = createAction<any>(
  "saveJwtTokenFromResponse"
);
export const saveJwtToken = createAction<string>("saveJwtToken");
export const setTokenUnverified = createAction<boolean>("setTokenUnverified");
export const setTokenVerified = createAction<boolean>("setTokenVerified");
export const showErrorToast = createAction<boolean>("showErrorToast");
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
export const verifyToken = (token: string) =>
  apiCall({
    url: "http://localhost:8080/user/login/verify",
    method: "GET",
    headers: { Authorization: "Bearer " + token },
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
  token: "",
  verified: false,
};
export default createReducer(initState, {
  [saveJwtTokenFromResponse.type]: (
    state: AuthState,
    action: PayloadAction<any>
  ) => {
    console.log(action.payload.headers);
    const token = "access_token" as keyof typeof action.payload.headers;
    Cookies.set("access_token", action.payload.headers[token]);
    state.token = action.payload.headers[token];
    state.verified = true;
  },
  [saveJwtToken.type]: (state: AuthState, action: PayloadAction<string>) => {
    state.token = action.payload;
  },
  [setTokenUnverified.type]: (
    state: AuthState,
    action: PayloadAction<boolean>
  ) => {
    state.verified = false;
  },
  [setTokenVerified.type]: (
    state: AuthState,
    action: PayloadAction<boolean>
  ) => {
    state.verified = true;
  },
  [showErrorToast.type]: (state: AuthState, action: PayloadAction<any>) => {
    toast.error(action.payload.data["error"]);
  },
});

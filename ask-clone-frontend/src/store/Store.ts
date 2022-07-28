import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiMiddleware from "./ApiMiddleware";
import AuthReducer from "./AuthReducer";

const store = configureStore({
  reducer: combineReducers({
    auth: AuthReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

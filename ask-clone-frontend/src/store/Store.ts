import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiMiddleware from "./ApiMiddleware";
import AuthReducer from "./AuthReducer";
import FeedReducer from "./FeedReducer";
import InboxReduer from "./InboxReduer";
import NotificationReducer from "./NotificationReducer";
import ProfileReducer from "./ProfileReducer";

const store = configureStore({
  reducer: combineReducers({
    auth: AuthReducer,
    profile: ProfileReducer,
    inbox: InboxReduer,
    feed: FeedReducer,
    notification: NotificationReducer
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["apiCall"],
      },
    }).concat(apiMiddleware),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { Fragment, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import Inbox from "./pages/Inbox";
import Login from "./pages/login";
import Main from "./pages/Main";
import Profile from "./pages/ProfilePage";
import Question from "./pages/QuestionPage";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import { getProfileInfo, updateProfileLoading } from "./store/ProfileReducer";
import { useAppDispatch } from "./store/hooks";
import NotificaionPage from "./pages/NotificaionPage";
import FriendsPage from "./pages/FriendsPage";
import AskQuestionCard from "./components/AskQuestionCard";
import AskUserPage from "./pages/AskUserPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateProfileLoading(true));
    dispatch(getProfileInfo());
  }, []);
  return (
    <Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user/question/:id" element={<Question />} />
          <Route path="/user/:username/ask" element={<AskUserPage />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route path="/user/inbox" element={<Inbox />} />
          <Route path="/user/friends" element={<FriendsPage />} />
          <Route path="/user/notifications" element={<NotificaionPage />} />
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </Fragment>
  );
}

export default App;

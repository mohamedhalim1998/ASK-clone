import Cookies from "js-cookie";
import React, { Fragment, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestProfile from "./pages/GuestProfile";
import Login from "./pages/login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import { saveJwtToken, verifyToken } from "./store/AuthReducer";
import { useAppDispatch } from "./store/hooks";
import { getProfileInfo, updateProfileLoading } from "./store/ProfileReducer";

function App() {
  const jwtToken = Cookies.get("access_token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwtToken !== undefined) {
      dispatch(saveJwtToken(jwtToken));
      dispatch(verifyToken(jwtToken));
      dispatch(updateProfileLoading(true));
      dispatch(getProfileInfo());
    }
  }, []);
  return (
    <Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user/:username" element={<GuestProfile />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/settings" element={<Settings />} />
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

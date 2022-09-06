import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestProfile from "./pages/GuestProfile";
import Inbox from "./pages/Inbox";
import Login from "./pages/login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Question from "./pages/Question";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user/question/:id" element={<Question />} />
          <Route path="/user/:username" element={<GuestProfile />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route path="/user/inbox" element={<Inbox />} />
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

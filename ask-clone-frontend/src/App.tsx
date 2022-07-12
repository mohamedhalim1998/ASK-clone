import React from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;

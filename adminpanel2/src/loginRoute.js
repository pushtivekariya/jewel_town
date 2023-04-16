import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CommonFiles from "./commonFiles";
import PageNot from "./pages/404/pageNot";
import Login from "./pages/login/login";
import ForgotPassword from "./pages/login/forgotPassword";

const LoginRoute = () => {
  const login_details = JSON.parse(localStorage.getItem("Login_info"));

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />;
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/404" element={<PageNot />} />
      </Routes>
    </>
  );
};

export default LoginRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/gis/Header";
import { accessToken } from "../constants";
import { getCookie } from "../https";

function AuthLayout() {
  const token = getCookie(accessToken);
  const siteName = getCookie("siteName");
  if (token) {
    return <Navigate to={`/${siteName}/dashboard`} replace />;
  }
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
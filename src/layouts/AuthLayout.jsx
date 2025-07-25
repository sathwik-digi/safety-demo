import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AuthLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
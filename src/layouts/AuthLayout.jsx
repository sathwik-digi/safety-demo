import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/gis/Header";
import Footer from "../components/gis/Footer";

function AuthLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
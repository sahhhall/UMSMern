import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const routesWithoutNavbar = [
    '/user/login',
    '/user/signup',
    '/admin/login',
  ];
  const shouldHideNavbar = routesWithoutNavbar.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default MainLayout;
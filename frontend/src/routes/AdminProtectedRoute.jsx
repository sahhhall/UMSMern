import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({children}) => {
  const { adminInfo } = useSelector((state) => state.adminauth);
  if (!adminInfo) {
    return <Navigate to="/admin" />;
  }
  return children;
};

export default AdminProtectedRoute;

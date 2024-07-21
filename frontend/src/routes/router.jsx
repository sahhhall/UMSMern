import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminDashBoard from "../pages/Admin/AdminDashBoard";
import AdminLogin from "../pages/Admin/AdminLogin";
import { wait } from "../utils/wait";
const LazyUserProfile = React.lazy(() =>
  wait(3000).then(() => import("../pages/User/UserDashboard"))
);
import UserLogin from "../pages/User/UserLogin";
import UserSIgnup from "../pages/User/UserSIgnup";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import UserProfileSkelton from "../components/UserProfileSkelton";
import ProtectedRoute from "./ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "admin", element: <AdminDashBoard /> },
      { path: "admin/login", element: <AdminLogin /> },
      {
        path: "user/profile",
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<UserProfileSkelton />}>
              <LazyUserProfile />
            </React.Suspense>
          </ProtectedRoute>
        ),
      },
      { path: "user/login", element: <UserLogin /> },
      { path: "user/signup", element: <UserSIgnup /> },
      // { path: '*', element: <NotFound /> },
    ],
  },
]);

export default routes;

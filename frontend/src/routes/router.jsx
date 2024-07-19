import { createBrowserRouter } from "react-router-dom";
import AdminDashBoard from "../pages/Admin/AdminDashBoard";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminSignup from "../pages/Admin/AdminSignup";
import UserDashboard from "../pages/User/UserDashboard";
import UserLogin from "../pages/User/UserLogin";
import UserSIgnup from "../pages/User/UserSIgnup";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'admin', element: <AdminDashBoard /> },
      { path: 'admin/login', element: <AdminLogin /> },
      { path: 'admin/signup', element: <AdminSignup /> },
      { path: 'user', element: <UserDashboard /> },
      { path: 'user/login', element: <UserLogin /> },
      { path: 'user/signup', element: <UserSIgnup /> },
      // { path: '*', element: <NotFound /> },
    ],
  },
]);

export default routes
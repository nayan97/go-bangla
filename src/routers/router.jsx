import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Register from "../pages/Auth/Register";
import Body from "../pages/Admin/Body";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
           {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>,
      </PrivateRoute>
    ),
    children: [
            {
        index: true,
        Component: Body,
      },
  

    
    ],
  },
]);

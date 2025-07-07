import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
]);

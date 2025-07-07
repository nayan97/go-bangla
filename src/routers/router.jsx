import {
  createBrowserRouter,
} from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
Component: Layout,
children: [
    {
        index: true,
        Component: Home,
    }
]
  },
]);
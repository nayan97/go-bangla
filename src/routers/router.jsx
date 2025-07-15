import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Register from "../pages/Auth/Register";
import Body from "../pages/Admin/Body";
import PendingGuides from "../pages/Admin/Guides/PendingGuides";
import MakeAdmin from "../pages/Admin/users/MakeAdmin";
import AddTourPackage from "../pages/Admin/Tour/AddTourPackage";

import JoinAsGuide from "../pages/Staff/JoinAsGuide";
import Forbidden from "../components/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import PackageDetails from "../pages/Users/PackageDetails/PackageDetails";
import MyBookings from "../pages/Users/UserPanel/MyBookings";
import Payment from "../pages/Payment/Payment";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "unauthorized",
        Component: Forbidden,
      },
      {
        path: "package-details/:id",
        element: (
          <PrivateRoute>
            <PackageDetails></PackageDetails>
          </PrivateRoute>
        ),
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
      {
        path: "join_as_guide",
        element: (
          <PrivateRoute>
            <JoinAsGuide></JoinAsGuide>
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      {
        path: "payment/:bookingsId",
        element: <Payment />,
      },
      {
        path: "pending_guides",
        element: (
          <PrivateRoute>
            <PendingGuides></PendingGuides>
          </PrivateRoute>
        ),
      },
      {
        path: "make-admin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "add-tour",
        element: (
          <AdminRoute>
            <AddTourPackage></AddTourPackage>
          </AdminRoute>
        ),
      },
    ],
  },
]);

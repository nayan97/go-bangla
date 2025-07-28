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
import AssignedTours from "../pages/Staff/AssignedTours";
import AddStory from "../pages/Story/AddStory";

import Forbidden from "../components/Forbidden";
import Spinner from "../components/Spinner";
import ErrorPage from "../components/ErrorPage";

import AdminRoute from "../routes/AdminRoute";
import PackageDetails from "../pages/Users/PackageDetails/PackageDetails";
import MyBookings from "../pages/Users/UserPanel/MyBookings";
import Payment from "../pages/Payment/Payment";
import ManageStory from "../pages/Story/ManageStory";
import EditStory from "../pages/Story/EditStory";
import CommunityPage from "../pages/page/CommunityPage";
import AboutUs from "../pages/page/AboutUs";
import Trips from "../pages/page/Trips";
import GuideProfile from "../pages/page/GuideProfile";
import StoryDetails from "../pages/page/StoryDetails";
import ManagePackage from "../pages/Admin/Tour/ManagePackage";
import EditTourPackage from "../pages/Admin/Tour/EditTourPackage";

export const router = createBrowserRouter([
  {
    Component: Layout,
    hydrateFallbackElement: <Spinner></Spinner>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "community",
        Component: CommunityPage,
      },
      {
        path: "/community/story/:id",
        Component: StoryDetails,
      },
      {
        path: "/guide-profile/:email",
        Component: GuideProfile,
      },

      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "all-trips",
        Component: Trips,
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
        
            <JoinAsGuide></JoinAsGuide>
          
        ),
      },
      {
        path: "add-story",
        Component: AddStory,
      },
      {
        path: "manage-stories",
        Component: ManageStory,
      },
      {
        path: "edit-story/:id",
        Component: EditStory,
      },
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      {
        path: "assigned-tours",
        Component: AssignedTours,
      },
      {
        path: "payment/:bookingsId",
        element: <Payment />,
      },
      {
        path: "pending_guides",
        element: <PendingGuides></PendingGuides>,
      },
      {
        path: "make-admin",
        element: <MakeAdmin></MakeAdmin>,
      },
      {
        path: "add-tour",
        element: <AddTourPackage></AddTourPackage>,
      },
      {
        path: "manage-tour",
        Component: ManagePackage,
      },
      {
        path: "edit-package/:id",
        Component: EditTourPackage,
      },
    ],
  },
]);

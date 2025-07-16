import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Tag,
  Truck,
  ShoppingBag,
  Percent,
  Users,
  File,
  PackageCheck,
  Boxes,
} from "lucide-react";
import useUserRole from "../../hooks/useUserRole";

const Sidebar = ({ isOpen }) => {
  const { role, isLoading } = useUserRole();

  return (
    <aside
      className={`bg-[#ddd]  h-full p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } overflow-hidden`}
    >
      <div className="space-y-2">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
        >
          <LayoutDashboard className="w-5 h-5" />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        {/* <NavLink to="/categories" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <FileText className="w-5 h-5" />
          {isOpen && <span>Category</span>}
        </NavLink>

        <NavLink to="/subcategory" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <Boxes className="w-5 h-5" />
          {isOpen && <span>Sub Category</span>}
        </NavLink>

        <NavLink to="/brands" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <PackageCheck className="w-5 h-5" />
          {isOpen && <span>Brands</span>}
        </NavLink>

        <NavLink to="/products" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <Tag className="w-5 h-5" />
          {isOpen && <span>Products</span>}
        </NavLink> */}
        {!isLoading && role === "admin" && (
          <>
            <NavLink
              to="/dashboard/make-admin"
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <Truck className="w-5 h-5" />
              {isOpen && <span>Make Admin</span>}
            </NavLink>
            <NavLink
              to="/dashboard/add-tour"
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <PackageCheck className="w-5 h-5" />
              {isOpen && <span>Add Tour Plan</span>}
            </NavLink>
            <NavLink
              to="/dashboard/pending_guides"
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <Percent className="w-5 h-5" />
              {isOpen && <span>Manage Candidates</span>}
            </NavLink>
          </>
        )}
        {!isLoading && role === "user" && (
          <>
            <NavLink
              to="/dashboard/join_as_guide"
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {isOpen && <span>JoinAsGuide</span>}
            </NavLink>

            <NavLink
              to="/dashboard/my-bookings"
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {isOpen && <span>My Bookings</span>}
            </NavLink>
          </>
        )}

        {!isLoading && role === "guide" && (
          <>
            <NavLink
              to="/dashboard/assigned-tours"
              className="flex items-center gap-3 p-2 rounded hover:bg-base-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {isOpen && <span>My Assigned Tours</span>}
            </NavLink>

          </>
        )}

        {/* 

        <NavLink to="/users" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <Users className="w-5 h-5" />
          {isOpen && <span>Users</span>}
        </NavLink>

        <NavLink to="/pages" className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
          <File className="w-5 h-5" />
          {isOpen && <span>Pages</span>}
        </NavLink> */}
      </div>
    </aside>
  );
};

export default Sidebar;

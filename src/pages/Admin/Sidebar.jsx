import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  Boxes,
  ShoppingCart,
  Briefcase,
  UserCog,
  PackagePlus,
  ShieldCheck,
} from "lucide-react";
import useUserRole from "../../hooks/useUserRole";

const Sidebar = ({ isOpen }) => {
  const { role, isLoading } = useUserRole();

  return (
    <aside
      className={`bg-[#ddd]  h-full p-4 transition-all duration-300 ${
        isOpen ? "w-40 lg:w-64" : "hidden"
      } overflow-hidden`}
    >
      <div className="space-y-2">
        <NavLink
          to="/dashboard"
          className="p-2 rounded hover:bg-base-300"
        >
          {isOpen && (
            <span className="flex items-center gap-3">
              {" "}
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </span>
          )}
        </NavLink>
        <NavLink
          to="/dashboard/add-story"
          className="p-2 rounded hover:bg-base-300"
        >
          {isOpen && (
            <span className="flex items-center gap-3">
              {" "}
              <FileText className="w-5 h-5" />
              Add Story
            </span>
          )}
        </NavLink>

        <NavLink
          to="/dashboard/manage-stories"
          className="p-2 rounded hover:bg-base-300"
        >
          
          {isOpen && <span className="flex items-center gap-3"> <Boxes className="w-5 h-5" />Manage Story</span>}
        </NavLink>

        {!isLoading && role === "admin" && (
          <>
            <NavLink
              to="/dashboard/make-admin"
              className="p-2 rounded hover:bg-base-300"
            >
           
              {isOpen && <span className="flex items-center gap-3"> <UserCog className="w-5 h-5" />Manage Users</span>}
            </NavLink>
            <NavLink
              to="/dashboard/add-tour"
              className="p-2 rounded hover:bg-base-300"
            >
            
              {isOpen && <span className="flex items-center gap-3"> <PackagePlus className="w-5 h-5" />Add Tour Plan</span>}
            </NavLink>
            <NavLink
              to="/dashboard/pending_guides"
              className="rounded hover:bg-base-300"
            >
            
              {isOpen && <span className="flex items-center gap-3"> <ShieldCheck className="w-5 h-5" />Manage Candidates</span>}
            </NavLink>
          </>
        )}
        {!isLoading && role === "user" && (
          <>
            <NavLink
              to="/dashboard/join_as_guide"
              className="p-2 rounded hover:bg-base-300"
            >
          
              {isOpen && <span className="flex items-center gap-3">  <Briefcase className="w-5 h-5" />JoinAsGuide</span>}
            </NavLink>

            <NavLink
              to="/dashboard/my-bookings"
              className="rounded hover:bg-base-300"
            >
             
              {isOpen && <span className="flex items-center gap-3">   <ShoppingCart className="w-5 h-5" />My Bookings</span>}
            </NavLink>
          </>
        )}

        {!isLoading && role === "guide" && (
          <>
            <NavLink
              to="/dashboard/assigned-tours"
              className="p-2 rounded hover:bg-base-300"
            >
             
              {isOpen && <span className="flex items-center gap-3">  <ShoppingBag className="w-5 h-5" />My Assigned Tours</span>}
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

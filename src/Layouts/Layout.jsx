import React from "react";
import { Outlet } from "react-router";
import Header from "../pages/Shared/Header";
import Footer from "../pages/Shared/Footer";

const Layout = () => {
  return (
    <div>
      <div className="max-w-4xl lg:max-w-7xl mx-auto">
        <Header></Header>
        <Outlet></Outlet>
      </div>
      <div className="bg-black">
        <div className="max-w-4xl lg:max-w-7xl mx-auto">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;

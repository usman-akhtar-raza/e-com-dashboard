import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { UseSelector } from "react-redux";
import Navbar from "./../../components/Navbar";
import Sidebar from "../../components/sidebar";

export default function Layout() {
  const [isSideBarOpen, setIssideBarOpen] = useState<boolean>(false);
  return (
    <>
      <div>
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIssideBarOpen={setIssideBarOpen}
        />
        <Navbar 
        // isSideBarOpen={isSideBarOpen}
        // setIssideBarOpen={setIssideBarOpen}
        />
        <Outlet />
      </div>
    </>
  );
}

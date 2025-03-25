// import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import { UseSelector } from "react-redux";
import Navbar from "./../../components/Navbar";
import Sidebar from "../../components/sidebar";
import { useGetUserQuery } from "../../state/api";
import { useSelector } from "react-redux";

function Layout() {
  // const [isSideBarOpen, setIssideBarOpen] = useState<boolean>(false);

  const userId = useSelector(
    (state: { global: { userId: string } }) => state.global.userId
  );
  const isSideBarOpen = useSelector(
    (state: { global: { isSideBarOpen: boolean } }) => state.global.isSideBarOpen
  );
  const { data } = useGetUserQuery(userId);
  console.log("data", data);
  return (
    <>
      <div>
        <Sidebar user={data || {}} />
        <Navbar user={data || {}} />
        <div className={`ml-10 ${isSideBarOpen===true ?"ml-36":""}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;

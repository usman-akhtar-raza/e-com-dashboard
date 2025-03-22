// import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import { UseSelector } from "react-redux";
import Navbar from "./../../components/Navbar";
import Sidebar from "../../components/sidebar";
import { useGetUserQuery } from "../../state/api";
import { useSelector } from "react-redux";

export default function Layout() {
  // const [isSideBarOpen, setIssideBarOpen] = useState<boolean>(false);

  const userId= useSelector((state:{global:{userId:string}})=>state.global.userId);
  const { data } = useGetUserQuery(userId);
  console.log("data",data);
  return (
    <>
      <div>
        <Sidebar
          user={data || {}}
          // isSideBarOpen={isSideBarOpen}
          // setIssideBarOpen={setIssideBarOpen}
        />
        <Navbar
          user={data || {}}
          // isSideBarOpen={isSideBarOpen}
          // setIssideBarOpen={setIssideBarOpen}
        />
        <Outlet />
      </div>
    </>
  );
}

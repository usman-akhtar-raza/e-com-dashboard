import React from "react";
import { useSelector } from "react-redux";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
 const isSideBarOpen = useSelector(
   (state: { global: { isSideBarOpen: boolean } }) => state.global.isSideBarOpen
 );
 
    return (
    <div className={`${isSideBarOpen===true?"ml-36":"ml-10"}`}>
      <h2 className="text-4xl font-bold text-gray-200 mb-1">{title}</h2>
      <h5 className="text-xl text-gray-400">{subtitle}</h5>
    </div>
  );
};

export default Header;

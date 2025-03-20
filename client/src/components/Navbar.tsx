import React, { useMemo } from "react";
import {  FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../state";
import { IoSettingsOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";

export default function Navbar() {
  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );
  const isSideBarOpen = useSelector(
    (state: { global: { isSideBarOpen: boolean } }) =>
      state.global.isSideBarOpen
  );

  const navClasses = useMemo(
    () => ({
      main: `max-h-screen ${
        mode === "dark"
          ? "dark bg-primary-600 text-white flex items-start justify-between px-6 py-4  shadow-xl"
          : "bg-secondary-300 text-gray-900 flex items-start justify-between px-6 py-4  shadow-xl"
      }`,
    }),
    [mode]
  );
  let dispatch = useDispatch();
  return (
    <nav className={navClasses.main}>
      {/* <div className=" ml-20 text-2xl font-bold ">
        <button onClick={() => setIssideBarOpen(!isSideBarOpen)}>
          <FaBars />
        </button>
      </div> */}
      <div className={`flex-1 mx-10 ${isSideBarOpen === true ? "ml-34" : ""} `}>
        <div className="flex items-center justify-between  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
          <div className="">
            <FaSearch />
          </div>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div>
        {/* <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"> */}
        <div className="flex w-75 gap-5 ">
          <button onClick={() => dispatch(setMode())}>
            {mode === "dark" ? <FaMoon /> : <FaSun />}
            {/* <FaMoon/> */}
          </button>

          <button>
            <IoSettingsOutline />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <img
                src="./profile.jpg"
                alt="profile"
                width={40}
                className="border rounded-full"
              />
              <div className="font-thin ">
                <p>name</p>
                <p>subtitle</p>
              </div>
              <MdArrowDropDown />
            </div>
          </div>
        </div>
        {/* </button> */}
      </div>
    </nav>
  );
}

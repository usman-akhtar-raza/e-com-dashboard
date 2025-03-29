import {  useMemo, useState } from "react";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../state";
import { IoSettingsOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import ProfileImage from "../assets/profile.jpg"
export default function Navbar(user: { user: any }) {
  const [anchorEl, setAnchorEL] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEL(e.currentTarget);
  const handleClose = (e: any) => setAnchorEL(null);
  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );


  const navClasses = useMemo(
    () => ({
      main: `max-h-screen grid grid-cols-1  ${
        mode === "dark"
          ? "dark bg-primary-700 text-white md:flex md:items-start md:justify-between px-6 py-4  shadow-xl"
          : "bg-secondary-300 text-gray-900 md:flex md:items-start md:justify-between px-6 py-4  shadow-xl"
      }`,
    }),
    [mode]
  );
  let dispatch = useDispatch();
  // console.log(anchorEl);
  return (
    <nav className={navClasses.main}>
     
      <div className={`flex-1 mx-10  `}>
        <div className={`${mode==="dark"? "bg-primary-500":"bg-secondary-700" } flex items-center justify-between  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}>
          <div className="">
            <FaSearch />
          </div>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div>
       
        <div className="flex w-75 gap-5 ">
          <button onClick={() => dispatch(setMode())}>
            {mode === "dark" ? <FaMoon /> : <FaSun />}
            
          </button>

          <button>
            <IoSettingsOutline />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <img
                src={ProfileImage}
                alt="profile"
                width={40}
                className="border rounded-full"
              />
              <div className="font-thin ">
                <p>{user.user.name}</p>
                <p>{user.user.occupation}</p>
              </div>
              <button onClick={handleClick}>
                <MdArrowDropDown />
              </button>
              {isOpen && (
                <div
                  className={`absolute right-24 top-16 dark ${
                    mode === "dark" ? `bg-primary-300` : "bg-secondary-200"
                  } px-10 py-2 rounded-md`}
                >
                  <menu>
                    <ul>
                      <li>
                        <p>menu here</p>
                      </li>{" "}
                      <li>
                        <p>Settings</p>
                      </li>{" "}
                      <li>
                        <p>LOG OUT</p>
                      </li>
                    </ul>
                    <button onClick={handleClose}>close</button>
                  </menu>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

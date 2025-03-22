import { useMemo } from "react";
import { setSideBar } from "../state";

import {
  // Cog6ToothIcon as  SettingsIcon,
  ChevronLeftIcon,
  // ChevronRightIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ReceiptPercentIcon,
  GlobeAltIcon,
  // CurrencyDollarIcon,
  CalendarIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileImage from "../assets/profile.jpg";
import { FaBars } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = (user: { user: any }) => {
  const isSideBarOpen = useSelector(
    (state: { global: { isSideBarOpen: Boolean } }) =>
      state.global.isSideBarOpen
  );
  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SidebarClasses = useMemo(
    () => ({
      main: `min-h-screen ${
        mode === "dark" ? "bg-primary-600 text-white" : "bg-secondary-300 "
      }`,
    }),
    [mode]
  );

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const menuItems = [
    {
      label: "Dashboard",
      icon: <HomeIcon className="w-5 h-5" />,
      path: "dashboard",
    },
    { label: "Client Facing", icon: null, path: "client-facing" },
    {
      label: "Products",
      icon: <ShoppingCartIcon className="w-5 h-5" />,
      path: "products",
    },
    {
      label: "Customers",
      icon: <UserGroupIcon className="w-5 h-5" />,
      path: "customers",
    },
    {
      label: "Transactions",
      icon: <ReceiptPercentIcon className="w-5 h-5" />,
      path: "transactions",
    },
    {
      label: "Geography",
      icon: <GlobeAltIcon className="w-5 h-5" />,
      path: "geography",
    },
    { label: "Sales", icon: null, path: "sales" },
    {
      label: "Overview",
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
      path: "overview",
    },
    {
      label: "Daily",
      icon: <CalendarIcon className="w-5 h-5" />,
      path: "daily",
    },
    {
      label: "Monthly",
      icon: <CalendarDaysIcon className="w-5 h-5" />,
      path: "monthly",
    },
    {
      label: "Breakdown",
      icon: <ChartPieIcon className="w-5 h-5" />,
      path: "breakdown",
    },
    { label: "Management", icon: null, path: "management" },
    {
      label: "Admin",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      path: "admin",
    },
    {
      label: "Performance",
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
      path: "performance",
    },
  ];

  return (
    <div
      className={`${SidebarClasses.main}${
        isSideBarOpen ? "w-64" : "w-20"
      } fixed h-full  shadow-lg transition-all duration-300 z-10`}
    >
      <div className="flex items-center justify-between p-4">
        {isSideBarOpen && (
          <span className="text-xl font-bold uppercase">NAME</span>
        )}
        <button
          onClick={() => dispatch(setSideBar(!isSideBarOpen))}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          {isSideBarOpen ? (
            <ChevronLeftIcon className="h-5 w-5" />
          ) : (
            <FaBars className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="border-b my-1 border-gray-200" />

      {/* Menu Items */}
      <div>
        {menuItems.map(({ label, icon, path }) => (
          <div
            key={label}
            className={`flex py-2 items-center justify-start ml-0  hover:bg-primary-300 transition-colors duration-300 cursor-pointer${
              active === path
                ? " dark:bg-secondary-300 bg-primary-600 text-black"
                : ""
            }`}
            // className={`  `}
            onClick={() => {
              navigate(`/${path}`);
              setActive(path);
            }}
          >
            {icon && <p className="my-2  mx-auto">{icon}</p>}

            {isSideBarOpen && (
              <div className=" mx-5 ">
                <p>{label}</p>
              </div>
            )}

            {/* {isSideBarOpen && icon ? (
              <div className="flex items-start gap-2 mx-auto ">
                <p>{label}</p>
              </div>
            ) : (
              <div className="  ">
                <p className="ml-6">{label}</p>
              </div>
            )} */}
          </div>
        ))}
      </div>
      {/* user profile */}
      <div>
        {isSideBarOpen && (
          <div className=" flex justify-between px-2 py-3   border-t mt-10">
            <img
              src={ProfileImage}
              alt="profile image"
              height={40}
              width={40}
              className="rounded-3xl border "
            />
            <div className="text-sm font-extralight">
              {" "}
              <p>{user.user.name}</p>
              <p>{user.user.occupation}</p>
            </div>
            <div className="flex items-center">
              <IoSettingsOutline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

import { Button } from "@components";
import { signout } from "@features";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaUser, FaSignOutAlt, FaBell, FaSun, FaMoon, } from "react-icons/fa";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { readFile } from "@services";
import { useTheme } from "@components";
const DashboardHeader = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dpSrc, setDpSrc] = useState(undefined);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    !!user && (async () => setDpSrc(await readFile(user.image)))();
  }, [user]);

  const notifications = [
    "You have a new message",
    "New friend request",
    "New Student added",
    "You have a new message",
    "New friend request",
    "New Student added",
    "You have a new message",
    "New friend request",
    "New Student added", "You have a new message",
    "New friend request",
    "New Student added", "You have a new message",
    "New friend request",
    "New Student added",
    "You have a new message",
    "New friend request",
    "New Student added",
    "You have a new message",
    "New friend request",
    "New Student added",
  ];


  return (
    <header
    className="z-10 shadow-md theme-dark:bg-[color:var(--Headerbg)] theme-light:bg-white "

      style={{ borderBottom: "1.5px solid var(--header-border)" }}
    >
      <div className="flex items-center justify-between px-4 py-3 ">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
          >
            <FaBars className="h-8 w-8" />
          </button>
        </div>

        {/* <div className="items-center">
          <img
            src="/images/logo.png"
            alt="FYP Management System"
            className="w-30 h-20 mb-3 ml-3 md:hidden item-center"
          />
        </div> */}

        <div className="flex items-center space-x-4">
          <Popover className="relative">
            <PopoverButton className="flex items-center space-x-2 p-2 rounded-full">
              {theme === "theme-dark" ? (
                <FaSun className="text-yellow-400 w-6 h-6" />
              ) : (
                <FaMoon className="text-blue-500 w-6 h-6" />
              )}
            </PopoverButton>
            <PopoverPanel className="absolute z-20 right-0 mt-1 p-4 rounded shadow-lg  theme-dark:bg-secondaryBackground flex gap-3">
            
              <Button
                onClick={() => setTheme("theme-dark")}
                className={`p-2 rounded-full ${theme === "theme-dark" ? "bg-bgBlue" : ""}`}

              >
                <FaSun/>
              </Button>
              <Button
                onClick={() => setTheme("theme-light")}
                className={`p-2 rounded-full ${theme === "theme-light" ? "bg-bgBlue" : ""
                  }`}
              >
                <FaMoon  />
              </Button>
            </PopoverPanel>
          </Popover>


          <Popover className="relative">
            <PopoverButton className="flex items-center space-x-2 focus:outline-none">

              <FaBell className="h-6 w-6 text-gray-500" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </PopoverButton>

            <PopoverPanel className="absolute right-0 mt-2 w-60  shadow-lg rounded-md z-20 p-4 overflow-y-auto max-h-60">
              <div className="text-xs text-gray-500 pb-2 border-b">
                Notifications
              </div>
              <div className="pt-2">
                {notifications.map((notification, index) => (
                  <div key={index} className="py-1 text-sm text-gray-700">
                    {notification}
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Popover className="relative">
            <PopoverButton className="flex items-center space-x-2 focus:outline-none">
              <div
                className="w-8 h-18 rounded-full flex items-center justify-center text-white font-semibold"
              >
                <img src={dpSrc} className="w-8 h-8 rounded-full object-cover object-center" />
              </div>
            </PopoverButton>

            <PopoverPanel className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md z-20 p-4">
              <div className="text-xs text-gray-500 pb-2 border-b">
                Signed in as
                <br />
                <strong >{user.email}</strong>
              </div>

              <div className="pt-2">
                <Button href="/profile" className="block px-2 py-2 text-md  text-gray-500 rounded transition hover:bg-black/10 hover:no-underline">
                  <FaUser className="mr-2" />
                  Profile Settings
                </Button>

                <Button href="./" onClick={() => dispatch(signout())} className=" block px-2 py-2  text-gray-500 text-md rounded transition hover:bg-black/10 hover:no-underline">
                  <FaSignOutAlt className="mr-2" />
                  SignOut
                </Button>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

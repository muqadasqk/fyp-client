import { Button, ThemeSwitcher } from "@components";
import { signout } from "@features";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaUser, FaSignOutAlt, FaBell, FaSun, FaMoon, } from "react-icons/fa";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { readFile } from "@services";

const DashboardHeader = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dpSrc, setDpSrc] = useState(undefined);

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
    <header className="bg-primary border-b border-primary shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3 ">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-primary md:hidden"
          >
            <FaBars className="h-7 w-7" />
          </button>
          
          <p className="pl-3">{document.title}</p>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeSwitcher />

          <Popover className="relative">
            <PopoverButton className="flex items-center space-x-2 focus:outline-none">

              <FaBell className="h-6 w-6 text-primary" />
              {notifications.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </div>
              )}
            </PopoverButton>

            <PopoverPanel className="absolute right-0 mt-2 w-60 bg-primary border border-primary shadow-lg rounded-md z-20 p-4 overflow-y-auto max-h-60">
              <div className="pb-2 border-b border-primary">
                Notifications
              </div>
              <div className="pt-2">
                {notifications.map((notification, index) => (
                  <div key={index} className="py-1 text-primary">
                    {notification}
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Popover className="relative">
            <PopoverButton className="flex items-center space-x-2 focus:outline-none">
              <div
                className="w-18 h-18 rounded-full flex items-center justify-center font-semibold"
              >
                <img src={dpSrc} className="w-8 h-8 rounded-full object-cover object-center" />
              </div>
            </PopoverButton>

            <PopoverPanel className="absolute right-0 mt-2 w-60 shadow-md bg-primary border border-primary rounded-md z-20">
              <div className="text-sm p-3 border-b border-primary">
                Signed in as
                <br />
                <strong >{user.email}</strong>
              </div>

              <div>
                <Button href="/profile" className="flex justify-start items-center p-2 ps-5 text-primary hover:bg-primary-hover hover:no-underline">
                  <FaUser className="mr-2" />
                  Profile
                </Button>

                <Button href="./" onClick={() => dispatch(signout())} className="flex justify-start items-center p-2 ps-5 text-primary hover:bg-primary-hover hover:no-underline">
                  <FaSignOutAlt className="mr-2" />
                  Signout
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

import { Button } from "@components";
import { signout } from "@features";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";
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
    <header
      className="bg-white shadow-md "
      style={{ borderBottom: "1.5px solid var(--out-line)" }}
    >
      <div className="flex items-center justify-between px-4 py-3 ">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
          >
            <FontAwesomeIcon icon={faBars} className="h-8 w-8" />
          </button>
        </div>

        {/* <div className="items-center">
          <img
            src="/images/fyp-ms-logo.png"
            alt="FYP Management System"
            className="w-10 mb-3 ml-3 md:hidden item-ce"
          />
        </div> */}

        <div className="flex items-center space-x-4">
          <Popover className="relative">
            <PopoverButton className="flex items-center space-x-2 focus:outline-none">

              <FontAwesomeIcon icon={faBell} className="h-6 w-6 text-gray-500" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </PopoverButton>

            <PopoverPanel className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md z-20 p-4 overflow-y-auto max-h-60">
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
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile Settings
                </Button>

                <Button href="./" onClick={() => dispatch(signout())} className=" block px-2 py-2  text-gray-500 text-md rounded transition hover:bg-black/10 hover:no-underline">
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
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

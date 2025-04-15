import { Button } from "@components";
import { signout } from "@features";
import { useAuth } from "@hooks";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";

const DashboardHeader = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <header
      className="bg-white shadow-md"
      style={{ borderBottom: "2px solid var(--out-line)" }}
    >
      <div className="flex items-center justify-between px-3 py-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
          <img
            src="/images/fyp-ms-logo.png"
            alt="FYP Management System"
            className="w-30 mb-3 ml-3 md:hidden"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Popover className="relative">
            <Popover.Button className="flex items-center space-x-2 focus:outline-none">
              {/* <FontAwesomeIcon icon={faBell} className="text-gray-500 h-5 w-5" /> */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                {user.name?.substring(0, 2).toUpperCase()}
              </div>
            </Popover.Button>

            <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20 p-4">
              <div className=" text-xs text-gray-500">
                Signed in as
                <br />
                <strong >{user.email}</strong>
              </div>
              <div className="border-t border-gray-100 "></div>
              <Link
                to="/profile"
                className="flex items-center text-sm my-2"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                View Profile
              </Link>
               <Button onClick={() => dispatch(signout())}
                className="my-1  w-full"
                > 
               <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
               SignOut
                </Button>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useAuth } from "@hooks";
import { signout } from "@features";
import { Button } from "@components";
import clsx from "clsx";
import { Navigations } from "./navigations";

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { role } = useAuth();

  return (<div
    className={clsx(
      "z-30 lg:w-[20%] w-[80%] bg-theme dark:bg-primary space-y-6 px-4 py-5 absolute inset-y-0 transform",
      "md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 flex flex-col",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}
  >
    <div className="flex items-center justify-center mx-auto relative">
      <img
        src="/images/logo.png"
        alt="FYP Management System"
        className="md:w-40 md:h-20 block mx-auto md:mt-0 mt-5"
      />
      <button
        onClick={toggleSidebar}
        className="md:hidden ms-auto mt-5"
      >
        <FaTimes className="h-8 w-8" />
      </button>
    </div>

    <div className="flex-grow">
      <Navigations role={role} />
    </div>

    <div>
      <Button onClick={() => dispatch(signout())} className="w-full bg-theme-hover dark:bg-primary-hover">
        <FaSignOutAlt /> Signout
      </Button>
    </div>
  </div>

  );
};
export default DashboardSidebar;

import { FaHome, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "@hooks";
import { signout } from "@features";
import { Button } from "@components";

const common = [
  { icon: <FaHome />, text: "Dashboard", href: "/" },
];

const admin = [
  { icon: <FaHome />, text: "Manage Accounts", href: "/manage-accounts" },
];

const supervisor = [];

const student = [];

const Navigatinons = ({ role }) => {
  const links = ({ admin, supervisor, student })[role];

  return (
    <nav className="space-y-2 px-4">
      {[...common, ...links].map(({ icon, text, href }) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-white/10 hover:text-white transition text-white ${isActive ? "bg-white/10" : ""
            }`
          }
        >
          <span className="inline-flex items-center gap-2">
            {icon} {text}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { role } = useAuth();

  return (
    <div className={`z-50 text-white w-[80%] sm:w-[20%] space-y-6 py-7 absolute inset-y-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
      style={{ background: "var(--background-color)" }}>
      <div className="flex items-center justify-center px-4">
        <img src="/images/logo-transparent.png" alt="FYP Management System"  />
        <button onClick={toggleSidebar} className="md:hidden ms-auto mt-5"
        ><FaTimes className="h-8 w-8" />
        </button>
      </div>

      <Navigatinons role={role} />
      <div className="absolute w-full bottom-4 p-4">
        <Button onClick={() => dispatch(signout())}
          className="w-full block rounded transition duration-500 text-white bg-[var(--out-line)] hover:bg-white/10">
          <FaSignOutAlt className="mr-3" /> Signout
        </Button>

      </div>
    </div>
  );
};
export default DashboardSidebar;

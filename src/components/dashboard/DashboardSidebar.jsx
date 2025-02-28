import { FaHome, FaCog, FaSignOutAlt, FaTimes, FaListCheck, FaSimCard } from "react-icons/fa";
import { Container, Button, Image } from "@components";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";

const Navigatinons = (links) => {
  const className = "d-flex align-items-center p-2 text-white text-decoration-none rounded";

  return (
    <nav className="flex-grow-1">
      {links.map(({ href, icon, text }, index) => (
        <NavLink key={index} to={href} className={({ isActive }) =>
          clsx(isActive ? "bg-primary fw-bold" : "hover-bg-primary", className)}
        >
          {icon}{text}
        </NavLink>
      ))}
    </nav>
  )
}

const DashboardSidebar = ({ isOpen, toggleSidebar, authenticatedUser }) => {
  const dispatch = useDispatch();

  const links = [
    { icon: <FaHome className="me-2" />, text: "Dashboard", href: "/dashboard" },
    { icon: <FaSimCard className="me-2" />, text: "eSim Plans", href: "/eSim-plans" },
    { icon: <FaListCheck className="me-2" />, text: "Manage User's eSim", href: "/manage-user-profiles" },
    { icon: <FaCog className="me-2" />, text: "Profile Settings", href: "/profile" },
  ];

  return (
    <aside
      className={clsx(
        "bg-secondary text-white position-fixed top-0 start-0 h-100 d-flex flex-column",
        "transition-transform",
        isOpen ? "translate-none" : "translate-middle-x",
        "z-20 shadow-sm"
      )}
      style={{ width: "16rem" }}
    >
      <Container fluid className="p-3 h-100">

        <div className="d-flex align-items-center justify-content-between mb-4">
          <Image
            src="/images/fyp-management-system-logo.png"
            className="w-75"
            alt="FYP Management System Logo"
          />

          <Button variant="outline" className="d-md-none" onClick={toggleSidebar}>
            <FaTimes className="fs-5" />
          </Button>
        </div>

        <Navigatinons links={links} />

        <div className="mt-auto">
          <Button variant="danger" className="w-100" /*onClick={() => dispatch(logout())}*/>
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        </div>

      </Container>
    </aside>
  );
};

export default DashboardSidebar;

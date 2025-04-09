import { FaHome, FaCog, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "@features";
import { useAuth } from "@hooks";
import { Button } from "@components";

const admin = [
    { icon: <FaHome />, text: "Admin Dashboard", href: "/" },
    { icon: <FaHome />, text: "Manage Accounts", href: "/manage-accounts" },
    { icon: <FaCog />, text: "Profile Settings", href: "/profile" },
];

const supervisor = [
    { icon: <FaHome />, text: "Supervisor Dashboard", href: "/" },
    { icon: <FaCog />, text: "Profile Settings", href: "/profile" },
];

const student = [
    { icon: <FaHome />, text: "Student Dashboard", href: "/" },
    { icon: <FaCog />, text: "Profile Settings", href: "/profile" },
];

const Navigatinons = () => {
    const { role } = useAuth();
    const links = ({ admin, supervisor, student })[role];

    return (
        <nav>
            {links.map(({ icon, text, href }) => (
                <NavLink key={href} to={href} className={({ isActive }) => isActive ? "active" : undefined} >
                    {icon}{text}
                </NavLink>
            ))
            }
        </nav >
    )
}

const DashboardSidebar = ({ toggleSidebar }) => {
    const dispatch = useDispatch();

    return (
        <aside>
            <div>
                <div>
                    <img src="/images/fyp-ms-logo.png" alt="FYP Management System" width={20} />
                    <button onClick={toggleSidebar}><FaTimes /></button>
                </div>
                <Navigatinons />
                <div>
                    <Button onClick={() => dispatch(signout())}>
                        <FaSignOutAlt /> Signout
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;

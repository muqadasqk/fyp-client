import clsx from "clsx";
import { FaFileAlt, FaHome, FaLightbulb, FaUsersCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const admin = [
    { icon: <FaHome />, text: "Dashboard", href: "/" },
    { icon: <FaUsersCog />, text: "Manage Accounts", href: "/manage-accounts" },
    { icon: <FaFileAlt />, text: "Manage Proposals", href: "/manage-proposals" },
];

const supervisor = [
    { icon: <FaHome />, text: "Dashboard", href: "/" },
];

const student = [
    { icon: <FaHome />, text: "Dashboard", href: "/" },
    { icon: <FaLightbulb />, text: "Proposals", href: "/proposals" },
];

const Navigatinons = ({ role }) => {
    const links = ({ admin, supervisor, student })[role];

    return (
        <nav className="space-y-2">
            {links.map(({ icon, text, href }) => (
                <NavLink
                    key={href}
                    to={href}
                    className={({ isActive }) =>
                        clsx(
                            "block px-4 py-2 rounded transition",
                            isActive
                                ? "bg-theme-hover dark:bg-primary-hover dark:text-primary "
                                : "bg-theme dark:bg-primary dark:text-primary hover:bg-theme-hover dark:hover:bg-primary-hover"
                        )
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

export default Navigatinons;
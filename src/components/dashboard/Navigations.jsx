import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { FaFileAlt, FaHome, FaLightbulb, FaUsersCog } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

const admin = [
    { icon: <FaHome />, text: "Dashboard", href: "/" },
    {
        icon: <FaUsersCog />,
        text: "Manage Accounts",
        children: [
            { text: "Admins", href: "/accounts/admins" },
            { text: "Supervisors", href: "/accounts/supervisors" },
            { text: "Students", href: "/accounts/students" },
            { text: "Pending", href: "/accounts/pending" },
            { text: "Rejected", href: "/accounts/rejected" },
        ],
    },
    {
        icon: <FaFileAlt />,
        text: "Manage Proposals",
        children: [
            { text: "Conditioanlly Accepted", href: "/proposals/conditionaly-accepted" },
            { text: "Accepted", href: "/proposals/accepted" },
            { text: "Pending", href: "/proposals/pending" },
            { text: "Rejected", href: "/proposals/rejected" },
        ],
    },
];

const supervisor = [
    { icon: <FaHome />, text: "Dashboard", href: "/" },
];

const student = [
    { icon: <FaHome />, text: "Dashboard", href: "/" },
    { icon: <FaLightbulb />, text: "My Ideas", href: "/my-ideas" },
];

const Navigations = ({ role }) => {
    const links = { admin, supervisor, student }[role];
    const location = useLocation();
    const [open, setOpen] = useState(null);

    useEffect(() => {
        const currentPath = location.pathname;
        const foundIndex = links.findIndex(link =>
            link.children?.some(child => currentPath.startsWith(child.href))
        );
        if (foundIndex !== -1) setOpen(foundIndex);
    }, [location.pathname, links]);

    const handleToggle = (index) => {
        setOpen(open === index ? null : index);
    };

    return (
        <nav className="space-y-1">
            {links.map((link, idx) => (
                <div key={link.href || link.text}>
                    {link.children ? (
                        <div>
                            <button
                                onClick={() => handleToggle(idx)}
                                className={clsx(
                                    "w-full flex items-center justify-between px-4 py-2 rounded transition",
                                    open === idx
                                        ? "bg-theme-hover dark:bg-primary-hover dark:text-primary"
                                        : "bg-theme dark:bg-primary dark:text-primary hover:bg-theme-hover dark:hover:bg-primary-hover"
                                )}
                            >
                                <span className="inline-flex items-center gap-2">
                                    {link.icon} {link.text}
                                </span>
                                {open === idx ? (
                                    <IoIosArrowDown className="text-sm" />
                                ) : (
                                    <IoIosArrowForward className="text-sm" />
                                )}
                            </button>

                            {open === idx && (
                                <div className="mt-1 bg-theme-secondary dark:bg-secondary rounded-md p-2">
                                    {link.children.map((sublink) => (
                                        <NavLink
                                            key={sublink.href}
                                            to={sublink.href}
                                            className={({ isActive }) =>
                                                clsx(
                                                    "block px-3 py-1 rounded text-sm transition dark:text-primary",
                                                    isActive
                                                        ? "bg-theme-hover dark:bg-primary-hover"
                                                        : "text-white dark:text-primary dark:bg-secondary hover:bg-theme-hover dark:hover:bg-primary-hover"
                                                )
                                            }
                                        >
                                            {sublink.text}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink
                            to={link.href}
                            className={({ isActive }) =>
                                clsx(
                                    "block px-4 py-2 rounded transition",
                                    isActive
                                        ? "bg-theme-hover dark:bg-primary-hover dark:text-primary"
                                        : "bg-theme dark:bg-primary dark:text-primary hover:bg-theme-hover dark:hover:bg-primary-hover"
                                )
                            }
                        >
                            <span className="inline-flex items-center gap-2">
                                {link.icon} {link.text}
                            </span>
                        </NavLink>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Navigations;

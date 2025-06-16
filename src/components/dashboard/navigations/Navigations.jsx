import clsx from "clsx";
import { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { admin, student, supervisor } from "../navigations";
import { useAuth } from "@hooks";

const Navigations = () => {
    const { role } = useAuth();
    const links = { admin, supervisor, student }[role];

    const [open, setOpen] = useState(() => {
        const path = window.location.pathname;
        return (
            links.find(
                (link) =>
                    link.href === path ||
                    (link.hasDropdown &&
                        link.children.some((child) =>
                            path.startsWith(link.href + child.href)
                        ))
            )?.href || ""
        );
    });

    const Navigation = ({ link }) => (
        <NavLink
            to={link.href}
            title={link.label}
            className={({ isActive }) =>
                clsx("block px-4 py-2 rounded transition", {
                    "bg-theme": isActive,
                    "text-primary hover:bg-[#2564eb2a]": !isActive,
                })
            }
        >
            <span className="inline-flex items-center gap-2 justify-center">
                <link.icon /> <span>{link.label}</span>
            </span>
        </NavLink>
    );

    const NavigationWithDropdown = ({ link }) => (
        <Fragment>
            <button
                onClick={() => setOpen(link.href)}
                className={clsx(
                    "w-full flex items-center justify-between px-4 py-2 transition",
                    {
                        "bg-theme rounded-t": open === link.href,
                        "text-primary hover:bg-[#2564eb2a] rounded": open !== link.href,
                    }
                )}
                title={link.label}
            >
                <span className="inline-flex items-center gap-2">
                    <link.icon /> <span>{link.label}</span>
                </span>

                <IoIosArrowForward
                    className={clsx("text-sm transition", {
                        "rotate-90": open === link.href,
                    })}
                />
            </button>

            {open === link.href && (
                <div className="bg-[#2564eb2a] text-sm shadow rounded p-2 space-y-1">
                    {link.children.map((sublink) => (
                        <NavLink
                            key={sublink.href}
                            to={link.href + sublink.href}
                            className={({ isActive }) =>
                                clsx(
                                    "w-full text-sm text-primary flex items-center justify-start gap-2 px-4 py-1 transition rounded",
                                    {
                                        "bg-[#2564eb2a]": isActive,
                                        "hover:bg-[#2564eb1a]": !isActive,
                                    }
                                )
                            }
                        >
                            <link.icon />  {sublink.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </Fragment>
    );

    return (
        <nav className="space-y-1">
            {links.map((current) => (
                <div key={current.href}>
                    {current.hasDropdown ? (
                        <NavigationWithDropdown link={current} />
                    ) : (
                        <Navigation link={current} />
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Navigations;

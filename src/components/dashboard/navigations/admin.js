import { has } from "lodash";
import { FaChalkboardTeacher, FaFileSignature, FaProjectDiagram, FaTachometerAlt, FaUserShield } from "react-icons/fa";

const admin = [
    {
        icon: FaTachometerAlt,
        label: "Dashboard",
        href: "/",
        hasDropdown: false
    },
    {
        icon: FaUserShield,
        label: "Manage Accounts",
        href: "/accounts",

        hasDropdown: true,
        children: [
            { label: "Admins", href: "/admins" },
            { label: "Supervisors", href: "/supervisors" },
            { label: "Students", href: "/students" },
            { label: "Pending", href: "/pending" },
            { label: "Rejected", href: "/rejected" },
        ],
    },
    {
        icon: FaFileSignature,
        label: "Manage Proposals",
        href: "/proposals",

        hasDropdown: true,
        children: [
            { label: "Cond. Accepted", href: "/conditionally-accepted" },
            { label: "Accepted", href: "/accepted" },
            { label: "Pending", href: "/pending" },
            { label: "Rejected", href: "/rejected" },
            { label: "All Previous", href: "/all-previous" },
        ],
    },
    {
        icon: FaProjectDiagram,
        label: "Manage Projects",
        href: "/projects",

        hasDropdown: true,
        children: [
            { label: "Under Development", href: "/under-development" },
            { label: "Initialized", href: "/initialized" },
            { label: "Completed", href: "/completed" },
        ],
    },
    {
        icon: FaChalkboardTeacher,
        label: "Manage Presentations",
        href: "/presentations",

        hasDropdown: true,
        children: [
            { label: "Pending Review", href: "/pending-review" },
            { label: "Approved", href: "/approved" },
            { label: "Rejected", href: "/rejected" },
        ],
    },
];

export default admin;
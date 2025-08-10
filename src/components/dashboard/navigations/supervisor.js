import { FaChalkboardTeacher, FaIdeal, FaMeetup, FaProjectDiagram, FaTachometerAlt, FaUserEdit } from "react-icons/fa";

const supervisor = [
    {
        icon: FaTachometerAlt,
        label: "Dashboard",
        href: "/",
        hasDropdown: false
    },
    {
        icon: FaProjectDiagram,
        label: "Manage Projects",
        href: "/projects",
        hasDropdown: true,
        children: [
            { label: "All", href: "" },
            { label: "Initialized", href: "/initialized" },
            { label: "Under Dev.", href: "/under-development" },
            { label: "Completed", href: "/completed" },
        ],
    },
    {
        icon: FaChalkboardTeacher,
        label: "Manage Presentations",
        href: "/presentations",
        hasDropdown: true,
        children: [
            { label: "All", href: "" },
            { label: "Reviewing", href: "/pending-review" },
            { label: "Approved", href: "/approved" },
            { label: "Rejected", href: "/rejected" },
        ],
    },
    {
        icon: FaMeetup,
        label: "Manage Meetings",
        href: "/meetings",
        hasDropdown: true,
        children: [
            { label: "All", href: "" },
            { label: "Past", href: "/past" },
            { label: "Scheduled", href: "/scheduled" },
        ],
    },
    {
        icon: FaIdeal,
        label: "Previous Projects",
        href: "/previous-projects",
        hasDropdown: true,
        children: [
            { label: "All", href: "" },
            { label: "My Supervised", href: "/my-supervised" },
        ],
    },
    {
        icon: FaUserEdit,
        label: "Profile Settings",
        href: "/profile",
        hasDropdown: false
    },
];

export default supervisor;
import { FaChalkboardTeacher, FaMeetup, FaProjectDiagram, FaTachometerAlt } from "react-icons/fa";

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
            { label: "All", href: "/all" },
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
            { label: "All", href: "/all" },
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
            { label: "All", href: "/all" },
            { label: "Past", href: "/past" },
            { label: "Upcoming", href: "/upcoming" },
        ],
    }


];

export default supervisor;
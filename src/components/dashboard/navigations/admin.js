import { FaChalkboardTeacher, FaFileSignature, FaProjectDiagram, FaTachometerAlt, FaUserShield } from "react-icons/fa";

const admin = [
    { icon: FaTachometerAlt, text: "Dashboard", href: "/" },
    {
        icon: FaUserShield,
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
        icon: FaFileSignature,
        text: "Manage Proposals",
        children: [
            { text: "Conditioanlly Accepted", href: "/proposals/conditionaly-accepted" },
            { text: "Accepted", href: "/proposals/accepted" },
            { text: "Pending", href: "/proposals/pending" },
            { text: "Rejected", href: "/proposals/rejected" },
            { text: "All Previous", href: "/proposals/all-previous" },
        ],
    },
    {
        icon: FaProjectDiagram,
        text: "Manage Projects",
        children: [
            { text: "Initialized", href: "/projects/initialized" },
            { text: "Under Development", href: "/projects/under-development" },
            { text: "Completed", href: "/projects/completed" },
        ],
    },
    {
        icon: FaChalkboardTeacher,
        text: "Manage Presentations",
        children: [
            { text: "Pending Review", href: "/presentations/pending-review" },
            { text: "Approved", href: "/presentations/approved" },
            { text: "Rejected", href: "/presentations/rejected" },
        ],
    },
];

export default admin;
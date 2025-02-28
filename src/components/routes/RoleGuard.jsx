import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks";

const RoleGuard = ({ allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) return <Navigate to="/signin" replace />;
    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default RoleGuard;

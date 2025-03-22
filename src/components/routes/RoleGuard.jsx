import { useAuth } from "@hooks";
import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (role || !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default RoleGuard;

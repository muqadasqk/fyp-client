import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks";

const AuthGuard = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthGuard;

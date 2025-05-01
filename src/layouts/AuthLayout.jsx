import { ThemeSwitcher } from "@components";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="fixed top-1 left-1"><ThemeSwitcher /></div>
            <Outlet />
        </div>
    );
}

export default AuthLayout;
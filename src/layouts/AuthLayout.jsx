import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Outlet />
    </div>
    );
}

export default AuthLayout;
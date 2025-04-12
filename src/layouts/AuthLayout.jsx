import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-none lg:bg-gray-100 px-4 py-4">
            <div className=" w-full max-w-md bg-white p-8 rounded-lg lg:border-solid lg:border-gray-900">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;

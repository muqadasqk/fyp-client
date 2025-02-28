import { Container } from "@components";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="d-flex vh-100 align-items-center justify-content-center bg-light">

            <Container
                className="d-flex flex-column align-items-center justify-content-center p-4 w-100"
                style={{ maxWidth: "480px", minHeight: "60vh" }}
            >
                <Outlet />
            </Container>
        </div>
    );
};

export default AuthLayout;

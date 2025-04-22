import { Link } from "react-router-dom";

const UnAuthorized = () => {
    return (
        <div className="flex flex-col  flex-1 justify-center text-center min-h-screen p-24 bg-gray-100">
            <h1>403 - Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <Link to={-1}>Return Back</Link>
        </div>
    );
};

export default UnAuthorized;

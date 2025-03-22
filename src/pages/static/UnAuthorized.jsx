import { Link } from "react-router-dom";

const UnAuthorized = () => {
    return (
        <div>
            <h1>403 - Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <Link to={-1}>Return Back</Link>
        </div>
    );
};

export default UnAuthorized;

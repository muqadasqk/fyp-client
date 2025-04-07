import { spinner } from "@assets";
import { Link } from "react-router-dom";

const Button = ({ isLoading, href, children, ...props }) => {
    if (href) return (
        <Link to={href} {...props}>{children}</Link>
    )

    return (
        <button disabled={isLoading} {...props}>
            {isLoading ? <img src={spinner} width={15} /> : children}
        </button>
    );
};

export default Button;

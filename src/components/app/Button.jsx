import { spinner } from "@assets";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Button = ({ isLoading, href, children, className, ...props }) => {
    const baseClasses = "flex items-center justify-center gap-2 button-primary";
    const linkClasses = "text-link";
    if (href) {
        return (
            <Link to={href} className={clsx(linkClasses, className)} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button disabled={isLoading} className={clsx(baseClasses, className)} {...props}>
            {isLoading ? (
                <img src={spinner} width={25} alt="loading" className="animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;

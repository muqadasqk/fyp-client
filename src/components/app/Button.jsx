import { spinner } from "@assets";
import { Link } from "react-router-dom";

const Button = ({ isLoading, href, children, className = "", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium text-white bg-[var(--primary-color)] hover:bg-[color:var(--out-line)] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const linkClasses = "text-[color:var(--link-color)] hover:text-[color:var(--link-hover-color)] underline font-medium transition duration-200";
    

    if (href) {
        return (
            <Link to={href} className={`${linkClasses} ${className}`} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            disabled={isLoading}
            className={`${baseClasses} ${className}`}
            {...props}
        >
            {isLoading ? (
                <img src={spinner} width={20} alt="loading" className="animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;

import { spinner } from "@assets";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Button = ({ isLoading, href, children, className = "", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium text-white bg-[color:var(--Headerbg)] theme-dark:bg-secondaryBackground  theme-dark:hover:bg-white/10 theme-light:bg-[var(--primary-color)] theme-light:hover:bg-[color:var(--out-line)] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    const linkClasses = "hover:underline font-medium transition duration-200";
    if (href) {
        return (
            <Link to={href} className={clsx(linkClasses, className)} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button disabled={isLoading} className={clsx(baseClasses, className)} {...props} >
            {isLoading ? (
                <img src={spinner} width={25} alt="loading" className="animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;

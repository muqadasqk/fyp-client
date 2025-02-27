import clsx from "clsx";
import { Link } from "react-router-dom";

const variantStyles = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  danger: "btn btn-danger",
  outline: "btn btn-outline-primary",
  link: "btn btn-link",
};

function Button({ variant, className, href, icon, children, ...props }) {
  className = clsx("btn", variantStyles[variant], className);

  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      {children && <span className="btn-text">{children}</span>}
    </>
  );

  return href ? (
    <Link to={href} className={className} {...props}>
      {content}
    </Link>
  ) : (
    <button className={className} {...props}>
      {content}
    </button>
  );
}

export default Button;

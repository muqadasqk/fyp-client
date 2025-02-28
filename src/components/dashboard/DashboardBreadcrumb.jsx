import { Link, useLocation } from "react-router-dom";

const DashboardBreadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Dashboard</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={path} className={`breadcrumb-item ${isLast ? "active" : ""}`}>
              {isLast ? segment.replace("-", " ") : <Link to={path}>{segment.replace("-", " ")}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DashboardBreadcrumb;

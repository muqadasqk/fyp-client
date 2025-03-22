import { Helmet } from "react-helmet-async";
import { DashboardBreadcrumb } from "@components";
import { Fragment } from "react";

const DashboardContent = ({ title = "", description = "", isLoading, children }) => {
  return (
    <Fragment>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div>
        {isLoading && <h1>Loading...</h1>}
        <DashboardBreadcrumb />
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <div>{children}</div>
      </div>
    </Fragment>
  );
};

export default DashboardContent;

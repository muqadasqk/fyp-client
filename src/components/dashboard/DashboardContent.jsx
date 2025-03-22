import { Helmet } from "react-helmet-async";
import { DashboardBreadcrumb, Loading } from "@components";
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
        {isLoading && <Loading />}
        <DashboardBreadcrumb />
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <div>{children}</div>
      </div>
    </Fragment>
  );
};

export default DashboardContent;

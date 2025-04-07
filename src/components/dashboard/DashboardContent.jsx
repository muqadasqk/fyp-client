import { Helmet } from "react-helmet-async";
import { Spinner } from "@components";
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
        {isLoading && <Spinner />}
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        <div>{children}</div>
      </div>
    </Fragment>
  );
};

export default DashboardContent;

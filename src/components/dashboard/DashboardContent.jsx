import { Helmet } from "react-helmet-async";
import { Container, DashboardBreadcrumb } from "@components";
import { Fragment } from "react";

const DashboardContent = ({ title, description, children }) => {
  return (
    <Fragment>
      <Helmet>
        <title>{title} | Admin Dashboard</title>
        <meta name="description" content={description ?? "Admin dashboard page"} />
      </Helmet>

      <Container className="p-4 bg-white shadow-sm rounded">
        <DashboardBreadcrumb />

        <h2 className="mb-2">{title}</h2>
        {description && <p className="text-muted">{description}</p>}
        <div className="mt-3">{children}</div>
      </Container>
    </Fragment>
  );
};

export default DashboardContent;

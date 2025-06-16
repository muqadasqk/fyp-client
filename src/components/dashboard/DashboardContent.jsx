import { Helmet } from "react-helmet-async";
import { Fragment } from "react";

const DashboardContent = ({ title = "FYP Management System", description = "", children }) => {
    return (
        <Fragment>
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>

            <div className="m-5 mb-20" >
                <div className="relative">{children}</div>
            </div>
        </Fragment>
    );
};

export default DashboardContent;

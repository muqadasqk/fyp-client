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

            {isLoading && <Spinner size={70} />}

            {/* <div className="m-3">
                <h6 className="text-secondary">{title}</h6>
            </div> */}

            <div className="m-5" >
                <div className="relative">{children}</div>
            </div>
        </Fragment>
    );
};

export default DashboardContent;

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

            {isLoading && <Spinner size={70}/>}
            <div className="m-5" >
                {(title || description) && (
                    <div >
                        {/* {title && <h2 className="font-bold text-gray-500">{title}</h2>}   */}
                        {/* {description && <p className="text-sm text-gray-500">{description}</p>} */}
                    </div>
                )}
                <div >{children}</div>
            </div>
        </Fragment>
    );
};

export default DashboardContent;

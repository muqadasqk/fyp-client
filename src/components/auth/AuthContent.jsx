import clsx from 'clsx';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const AuthContent = ({ title = "Title", description = "Description", className = "w-full", children }) => {
    return (
        <div
            className={clsx(
                "border-none rounded-lg lg:p-10 shadow ",
                "lg:bg-white lg:border-gray-200",
                "md:bg-white ",
                "sm:bg-none sm:border-none"
            ,
                className
            )}
        >
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>

            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>

            <div>
                {children}
            </div>
        </div>
    );
};

export default AuthContent;

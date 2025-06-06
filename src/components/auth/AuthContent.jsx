import clsx from 'clsx';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const AuthContent = ({ title = "Title", description = "Description", className = "w-full", children }) => {
    return (
        <div
            className={clsx(
                "border-0 p-5 w-full",
                "sm:p-10 sm:bg-primary sm:border-primary sm:border sm:rounded-lg",
                className
            )}
        >
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>

            <div className="text-center mb-6">
                <h3 className="text-2xl text-[var(--theme-primary-color)] font-bold">{title}</h3>
                <p className="text-secondary mt-1">{description}</p>
            </div>

            <div>
                {children}
            </div>
        </div>
    );
};

export default AuthContent;

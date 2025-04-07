import React from 'react'
import { Helmet } from 'react-helmet-async';

const AuthContent = ({ title = "Title", description = "Description", children }) => {
    return (
        <div>
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>

            <div>
                <h3>{title}</h3>
                <p>{description}</p>

                <div>{children}</div>
            </div>
        </div>
    );
}

export default AuthContent
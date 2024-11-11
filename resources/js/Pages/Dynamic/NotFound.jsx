import React from "react";

const NotFound = ({ message }) => {
    return (
        <div className="container">
            <h1>404 - Product Not Found</h1>
            <p>
                {message ||
                    "Sorry, we couldn't find the product you're looking for."}
            </p>
            <a href="/products">Go back</a>
        </div>
    );
};

export default NotFound;

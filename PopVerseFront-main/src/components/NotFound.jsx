import React from "react"
import { useNavigate } from "react-router-dom";

import "../assets/css/notFound.css";

export const NotFound = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate("/");
    };

    return(
        <div className="container">
            <h1 className="header">404</h1>
            <p className="message">Ooops! Pareces perdido en el espacio!!!</p>
            <p className="emoji"> :thumbsUp: </p>
            <button className="btn btn-primary" onClick={handleGoHome}>Vamos a Casa</button>
        </div>
    );
};
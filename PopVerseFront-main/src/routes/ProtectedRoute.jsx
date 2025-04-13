import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = ({ children }) => {
    const { token } = useContext(UserContext);
    if(!token) {
        return <Navigate to="/login" replace/>;
    }
    return children? children : <Outlet />;
};

export const PublicRoute = ({ children }) => {
    const { token } = useContext(UserContext);
    if(token) {
        return <Navigate to="/" replace/>;
    }
    return children ? children : <Outlet />;
}
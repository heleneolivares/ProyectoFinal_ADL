import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from localStorage (if any)
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    // Check if user is logged in (restore from localStorage)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const dummyUser = {
        email: "test@user.com",
        password: "123456",
        name: "Test User",
    };

    

    // Login function (fake authentication, replace with API call)
    const login = async (email, password) => {
        if (email === dummyUser.email && password === dummyUser.password) {
            setUser(dummyUser);
            localStorage.setItem("user", JSON.stringify(dummyUser)); // Persist login
            return true;
        }
        return false;
    };

    // Logout function
    const logout = () => {
        setUser(null);
        navigate("/login");
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

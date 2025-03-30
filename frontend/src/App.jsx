import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import EditProfile from "./pages/EditProfile";
import OrderHistory from "./pages/OrderHistory";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <Router>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
                <Route path="/" element={<Home darkMode={darkMode} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orderHistory" element={<OrderHistory />} />
                {/*
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/editProfile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/category/:categoryName" element={<Category darkMode={darkMode} />} />
            </Routes>
        </Router>
    );
}

export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import EditProfile from "./pages/EditProfile";
import OrderHistory from "./pages/OrderHistory";
import Checkout from "./pages/Checkout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/login" />;
};

function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Routes>
                        <Route path="/" element={<Home darkMode={darkMode} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/orderHistory" element={<OrderHistory />} />
                        <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/editProfile" element={<EditProfile />} />
                        <Route path="/category/:categoryName" element={<Category darkMode={darkMode} />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import EditProfile from "./pages/EditProfile";
import OrderHistory from "./pages/OrderHistory";
import Checkout from "./pages/Checkout";
import SearchResults from "./pages/SearchResults";
import { NotFound } from "./components/NotFound";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <BrowserRouter>
            <UserProvider>
                <CartProvider>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Routes>
                        <Route path="/" element={<Home darkMode={darkMode} />} />
                        <Route path="/login" element={<Login darkMode={darkMode}/>} />
                        <Route path="/register" element={<Register darkMode={darkMode}/>} />
                        <Route path="/search" element={<SearchResults darkMode={darkMode} />} />
                        <Route path="/category/:categoryName" element={<Category darkMode={darkMode} />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/editProfile" element={<EditProfile darkMode={darkMode}/>} />
                            <Route path="/orderHistory" element={<OrderHistory darkMode={darkMode} />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/wishlist" element={<Wishlist darkMode={darkMode} />} />
                        </Route>
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </CartProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
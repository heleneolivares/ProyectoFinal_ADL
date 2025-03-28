import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

function App() {
    
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
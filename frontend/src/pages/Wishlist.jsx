import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardWishlistItem from "../components/CardWishlistItem";
import { Link } from "react-router-dom";

const mockProducts = [
    {
        id: 1,
        name: "POP! ACES HIGH EDDIE",
        brand: "Iron Maiden",
        price: "16990",
        image: "https://your-image-url.com/eddie.png",
    },
    {
        id: 2,
        name: "POP! SPIDER-MAN",
        brand: "Marvel",
        price: "17500",
        image: "https://your-image-url.com/spiderman.png",
    },
];

const Wishlist = () => {
    return (
        <div className="container mt-4 d-flex">
            {/* Sidebar Menu */}
            <div className="col-md-3 p-3 border-end">
                <h4>Mi Cuenta</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/editProfile" className="text-decoration-none">Editar Perfil</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/orderHistory" className="text-decoration-none">Historial de Órdenes</Link>
                    </li>
                    <li className="list-group-item active">
                        <Link to="/wishlist" className="text-decoration-none text-white">Wishlist</Link>
                    </li>
                </ul>
            </div>

            {/* Wishlist Items */}
            <div className="col-md-9 p-3">
                <h1>Wishlist</h1>
                <div className="d-flex flex-column gap-3">
                    {mockProducts.map((product) => (
                        <CardWishlistItem
                            key={product.id}
                            product={product}
                            darkMode={false} // Adjust darkMode based on user preferences
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist
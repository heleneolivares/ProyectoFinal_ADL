import React from "react";
import { useCart } from "../context/CartContext";
import "../assets/css/CardProduct.css";

export default function CardProduct({ product, darkMode }) {
    const { addToCart } = useCart();

    return (
        <div
            className={`card shadow-sm border-0 rounded-4 p-3 ${
                darkMode ? "bg-dark text-white" : "bg-white text-dark"
            }`}
            style={{ maxWidth: "280px" }}
        >
            {/* Wishlist Heart */}
            <div className="position-absolute top-0 end-0 p-2">
                <button className="btn border-0">
                    <i className={`bi bi-heart fs-4 ${darkMode ? "text-white" : "text-dark"}`}></i>
                </button>
            </div>

            {/* Image */}
            <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ objectFit: "contain", height: "180px" }}
            />

            {/* Details */}
            <div className="card-body text-center">
                <h6 className="text-uppercase fw-light">{product.brand}</h6>
                <h5 className="fw-bold">{product.name}</h5>
                <p className="fs-5 fw-bold">${product.price}</p>
                <button onClick={() => addToCart(product)} className={`btn w-100 fw-bold ${darkMode ? "btn-light text-dark" : "btn-primary text-white"}`}>
                    Añadir al Carro
                </button>
            </div>
        </div>
    );
}
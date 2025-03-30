import React from "react";
import "../assets/css/CardProduct.css";

export default function CardWishlistItem({ product, darkMode }) {
    return (
        <div
            className={`card shadow-sm border-0 rounded-4 p-3 d-flex align-items-center ${
                darkMode ? "bg-dark text-white" : "bg-white text-dark"
            }`}
            style={{ maxWidth: "900px" }}
        >
            {/* Wishlist Heart */}
            <div className="position-absolute top-0 end-0 p-2">
                <button className="btn border-0">
                    <i className={`bi bi-heart fs-4 ${darkMode ? "text-white" : "text-dark"}`}></i>
                </button>
            </div>

            {/* Image */}
            <div className="flex-shrink-0">
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ objectFit: "contain", height: "120px", width: "120px" }}
                />
            </div>

            {/* Details */}
            <div className="card-body d-flex flex-column ms-3 text-center">
                <h6 className="text-uppercase fw-light">{product.brand}</h6>
                <h5 className="fw-bold">{product.name}</h5>
                <p className="fs-5 fw-bold">${product.price}</p>
                <button
                    className={`btn w-100 fw-bold ${darkMode ? "btn-light text-dark" : "btn-primary text-white"}`}
                >
                    Añadir al Carro
                </button>
            </div>
        </div>
    );
}
import React, { useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { UserContext } from "../context/UserContext";
import "../assets/css/CardProduct.css";

export default function CardWishlistItem({ product, darkMode }) {
    const { token } = useContext(UserContext);
    const [favs, setFavs] = useState([]);

    const handleWishlistClick = async (id) => {
        try {
            // Si el usuario está logueado, realiza la llamada a la API para agregar el producto a favoritos
            await api.delete(
                `/favorites/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluye el token en las cabeceras
                    },
                }
            );
            alert("Producto quitado de tu lista de deseos.");
            // Actualiza la lista de favoritos en el estado
            setFavs((prevFavs) => prevFavs.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error al quitar el producto de favoritos:", error);
            alert("Hubo un error al quitar el producto de tu lista de deseos.");
        }
    };

    return (
        <div
            className={`card rounded-4 p-3 d-flex align-items-center ${
                darkMode ? "bg-dark text-white card-shadow-light" : "bg-white text-dark "
            }`}
            style={{ maxWidth: "900px" }}
            key={product.sku}
        >   
            {/* Wishlist Heart */}
            <div className="position-absolute top-0 end-0 p-2">
                <button className="btn border-0" onClick={() => handleWishlistClick(product.id)}>
                    <i className={`bi bi-heart fs-4 ${darkMode ? "text-white" : "text-dark"}`}></i>
                </button>
            </div>

            {/* Image */}
            <div className="flex-shrink-0">
                <img
                    src={product.image_url}
                    className="card-img-top"
                    alt={product.name}
                    style={{ objectFit: "contain", height: "120px", width: "120px" }}
                />
            </div>

            {/* Details */}
            <div className="card-body d-flex flex-column ms-3 text-center">
                <h6 className="text-uppercase fw-light">{product.category}</h6>
                <h5 className="fw-bold">{product.name}</h5>
                <p className="fs-5 fw-bold">
                    {new Intl.NumberFormat(navigator.language, {
                            style: "currency",
                            currency: "CLP",
                    }).format(product.price)}
                </p>
                <button
                    className={`btn w-100 fw-bold ${darkMode ? "btn-light text-dark" : "btn-primary text-white"}`}
                >
                    Añadir al Carro
                </button>
            </div>
        </div>
    );
}
import React, { useState, useEffect, useContext } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";

import "../assets/css/CardProduct.css";

export default function CardProduct({ product, darkMode }) {
  const [isFav, setIsFav] = useState(false);
  const { addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleWishlistClick = async (id) => {
    if (!token) {
      alert("Por favor inicia sesión para agregar productos a tu lista de deseos.");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/favorites",
        { product_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFav(!isFav);
    } catch (error) {
      console.error("Error al agregar el producto a favoritos:", error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);

    // Abrir el carrito automáticamente
    const cartOffcanvasEl = document.getElementById("cartOffcanvas");
    if (cartOffcanvasEl) {
      const bsOffcanvas = new window.bootstrap.Offcanvas(cartOffcanvasEl);
      bsOffcanvas.show();
    }
  };

  return (
    <div
      className={`card custom-card border-0 rounded-4 p-3 d-flex flex-column w-100 ${
        darkMode ? "bg-dark text-white card-shadow-light" : "bg-white text-dark"
      }`}
      style={{ height: isMobile ? "370px" : "420px" }}
    >
      {/* Wishlist Heart */}
      <div
        onClick={() => handleWishlistClick(product.id)}
        style={{ cursor: "pointer" }}
        className="position-absolute top-0 end-0 m-2 fs-5"
      >
        {isFav ? (
          <FaHeart className="text-danger" />
        ) : (
          <FaRegHeart className="text-secondary" />
        )}
      </div>

      {/* Imagen */}
      <div className="text-center mb-3" style={{ height: "180px" }}>
        <img
          src={product.image_url}
          alt={product.name}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
          className="rounded-3"
        />
      </div>

      {/* Contenido con botón abajo */}
      <div className="d-flex flex-column justify-content-between flex-grow-1">
        <div className="text-center">
          <h6 className="text-uppercase fw-light fs-6 text-truncate">{product.category}</h6>
          <h5
            className="fw-bold fs-6"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "3rem",
            }}
          >
            {product.name}
          </h5>
          <p className="fs-6 fw-bold mb-3">
            {new Intl.NumberFormat(navigator.language, {
              style: "currency",
              currency: "CLP",
            }).format(product.price)}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn fw-bold w-100 btn-primary text-white"
          style={{ height: "42px" }}
        >
          Añadir al Carro
        </button>
      </div>
    </div>
  );
}

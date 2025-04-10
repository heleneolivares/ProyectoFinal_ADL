import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import "../assets/css/Navbar.css";

export default function Navbar({ darkMode, setDarkMode }) {
  const { cart, removeFromCart } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProtectedRoute = (path) => {
    if (!user) {
      navigate("/login", { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [darkMode]);

  const categories = [
    { name: "Movies", path: "/category/movies" },
    { name: "VideoGames", path: "/category/videogames" },
    { name: "Series", path: "/category/series" },
    { name: "Anime", path: "/category/anime" },
    { name: "Sport", path: "/category/sport" },
    { name: "Music", path: "/category/music" },
    { name: "Pokémon", path: "/category/pokémon" },
  ];

  return (
    <>
      {/* NAVBAR MOBILE */}
      <div className="d-flex d-lg-none flex-column px-3 py-2">
        <div className="d-flex justify-content-between align-items-center w-100 mb-2">
          <div className="d-flex align-items-center gap-2">
            <button
              className={`btn p-0 ${darkMode ? "text-white" : "text-dark"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMobileMenu"
            >
              <i className="bi bi-list fs-3"></i>
            </button>

            {user ? (
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className={`btn  ${darkMode ? "text-white" : "text-dark"} `} to="/login">
                Login
              </Link>
            )}
          </div>

          <Link
            className={`fw-bold fs-4 text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}
            to="/"
          >
            PopVerse
          </Link>
        </div>

        <div className="d-flex align-items-center w-100 gap-2 mb-2">
          <input
            className={`form-control ${darkMode ? "bg-light text-dark" : "bg-white text-dark"}`}
            type="text"
            placeholder="Buscador"
          />
          <button
            className={`btn position-relative  ${darkMode ? "text-white" : "text-dark"} `}
            data-bs-toggle="offcanvas"
            data-bs-target="#cartOffcanvas"
          >
            <i className="bi bi-cart"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>
          <button className="btn " onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="collapse" id="navbarMobileMenu">
          <ul className="navbar-nav">
            {categories.map((category) => (
              <li key={category.name}>
                <Link className="nav-link" to={category.path}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* NAVBAR DESKTOP */}
      <nav
        className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"} d-none d-lg-flex`}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link
            className={`navbar-brand fw-bold fs-4 ${darkMode ? "text-white" : "text-dark"}`}
            to="/"
          >
            PopVerse
          </Link>

          <div
            className="collapse navbar-collapse d-flex align-items-center justify-content-between"
            id="navbarTogglerDemo03"
          >
            <div className="container mt-2">
              <div className="d-flex justify-content-center">
                <div
                  className="input-group"
                  style={{ maxWidth: "800px", width: "100%" }}
                >
                  <input
                    className={`form-control text-center fs-5 border-0 ${darkMode ? "bg-light" : "bg-outline"}`}
                    type="text"
                    placeholder="Buscador"
                    aria-label="Search"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 ms-auto">
              {user ? (
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className={`btn  ${darkMode ? "text-white" : "text-dark"} `} to="/login">
                Login
              </Link>
              )}

              <button
                className={`btn  ${darkMode ? "text-white" : "text-dark"} `}
                onClick={() => handleProtectedRoute("/wishlist")}
              >
                Wishlist
              </button>

              <button
                className={`btn position-relative ${darkMode ? "text-white" : "text-dark"} `}
                data-bs-toggle="offcanvas"
                data-bs-target="#cartOffcanvas"
              >
                Cart
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="btn "
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "🌞" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Categories shown below the full navbar on desktop only */}
      <div className="container-fluid d-none d-lg-block mt-2">
        <div className="d-flex justify-content-around">
          {categories.map((category) => (
            <Link key={category.name} className={`text-decoration-none fw-semibold ${darkMode ? "text-white" : "text-dark"}`} to={category.path}>
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Offcanvas Cart */}
      <div
        className={`offcanvas offcanvas-end ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
        id="cartOffcanvas"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">🛒 Tu Carrito</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px", height: "50px" }}
                />
                <span>
                  {item.name} x{item.quantity}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  ❌
                </button>
              </div>
            ))
          )}
          <button
            className="btn btn-success w-100 mt-3"
            onClick={() => handleProtectedRoute("/checkout")}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  );
}

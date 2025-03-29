import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
    useEffect(() => {
        // Apply dark/light mode to the body
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
        { name: "Pokemon", path: "/category/pokemon" },
    ];

    return (
        <>
        <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
            <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03">
                <span className="navbar-toggler-icon"></span>
            </button>

            <Link className="navbar-brand" to="/">PopVerse</Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/wishlist">Wishlist</Link>
                </li>
                <li className="nav-item">
                    <button className="nav-link btn btn-link" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                    Cart
                    </button>
                </li>

                {/* Dropdown for Categories */}
                <li className="nav-item dropdown d-lg-none">
                    <button className={`nav-link dropdown-toggle btn btn-link ${darkMode ? "text-light" : "text-dark"}`} id="categoryDropdown" data-bs-toggle="dropdown">
                    Categories
                    </button>
                    <ul className={`dropdown-menu ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} aria-labelledby="categoryDropdown">
                    {categories.map((category) => (
                        <li key={category.name}>
                        <Link className="dropdown-item" to={category.path}>{category.name}</Link>
                        </li>
                    ))}
                    </ul>
                </li>
                </ul>

                {/* Search Bar */}
                <div className="container mt-2">
                <div className="d-flex justify-content-center">
                    <div className="input-group" style={{ maxWidth: "800px", width: "100%" }}>
                    <input className={`form-control text-center fs-5 border-0 ${darkMode ? "bg-light" : "bg-outline"}`} type="text" placeholder="Buscador" aria-label="Search" />
                    <button className={`btn ${darkMode ? "btn-light" : "btn-dark"} border-0`}>
                        <i className="bi bi-search fs-5"></i>
                    </button>
                    </div>
                </div>
                </div>

                {/* Dark Mode Button */}
                <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️" : "🌙"}
                </button>
            </div>
            </div>
        </nav>

        {/* Categories visible only on larger screens */}
        <div className="container-fluid d-none d-lg-block">
            <div className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
            <ul className="navbar-nav w-100 d-flex justify-content-between">
                {categories.map((category) => (
                <li className="nav-item" key={category.name}>
                    <Link className="nav-link" to={category.path}>{category.name}</Link>
                </li>
                ))}
            </ul>
            </div>
        </div>

        {/* Cart Offcanvas */}
        <div className={`offcanvas offcanvas-end ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} id="cartOffcanvas">
            <div className="offcanvas-header">
            <h5 className="offcanvas-title">🛒 Tu Carrito</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body">
            <p>Aquí aparecerán los productos en el carrito...</p>
            <button className="btn btn-success w-100">Finalizar compra</button>
            </div>
        </div>
        </>
    );
}

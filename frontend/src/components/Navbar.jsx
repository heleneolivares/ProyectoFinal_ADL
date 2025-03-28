import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

export default function NavBar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Aplica el modo oscuro/claro al body
        if (darkMode) {
            document.body.classList.add("bg-dark", "text-light");
            document.body.classList.remove("bg-light", "text-dark");
        } else {
            document.body.classList.add("bg-light", "text-dark");
            document.body.classList.remove("bg-dark", "text-light");
        }
    }, [darkMode]);

    return (
        <>
        <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
            <div className="container-fluid">
                {/* Botón para colapsar en móviles */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Logo */}
                <Link className="navbar-brand" to="/">PopVerse</Link>

                {/* Contenido del navbar */}
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
                    </ul>

                    {/* Barra de búsqueda */}
                    <div className="container mt-2">
                        <div className="d-flex justify-content-center">
                            <div className="input-group" style={{ maxWidth: "800px", width: "100%" }}>
                                <input className={`form-control text-center fs-5 border-0 ${darkMode ? "bg-light":"bg-outline" }`} type="text" placeholder="Buscador" aria-label="Search"/>
                                <button className={`btn ${darkMode ? "btn-light" : "btn-dark"} border-0`}>
                                    <i className="bi bi-search fs-5"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Botón de modo oscuro */}
                    <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                </div>
            </div>
        </nav>

        <div className={`offcanvas offcanvas-end ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} tabIndex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="cartOffcanvasLabel">🛒 Tu Carrito</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <p>Aquí aparecerán los productos en el carrito...</p>
                <button className="btn btn-success w-100">Finalizar compra</button>
            </div>
        </div>
        </>
    );
}
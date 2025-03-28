import React, { useState, useEffect } from "react";

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
        <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
            <div className="container-fluid">
                {/* Botón para colapsar en móviles */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Logo */}
                <a className="navbar-brand" href="#">PopVerse</a>

                {/* Contenido del navbar */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Wishlist</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cart</a>
                        </li>
                    </ul>

                    {/* Barra de búsqueda */}
                    <div className="container mt-3">
                        <div className="d-flex justify-content-center">
                            <div className="input-group" style={{ maxWidth: "800px", width: "100%" }}>
                                <input className="form-control text-center fs-4 border-0 bg-light" type="text" placeholder="Buscador" aria-label="Search"/>
                                <button className="btn btn-outline-light">
                                    <i className="bi bi-search fs-4"></i>
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
    );
}
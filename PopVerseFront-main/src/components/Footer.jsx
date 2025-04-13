import React from "react";

export default function Footer({ darkMode }) {
    return (
        <footer className={`py-5 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            {/* Íconos de redes sociales */}
            <div className="d-flex justify-content-center gap-4 mb-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className={`bi bi-facebook fs-3 ${darkMode ? "text-white" : "text-dark"}`}></i>
                </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className={`bi bi-instagram fs-3 ${darkMode ? "text-white" : "text-dark"}`}></i>
            </a>
            </div>
            {/* Texto del footer */}
            <p className="text-center mb-0 fw-light">2025 PopVerse - Todos los derechos reservados</p>
        </footer>
    );
}
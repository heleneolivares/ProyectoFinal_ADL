import React from "react";

export default function Footer({ darkMode }) {
    return (
        <footer className={`py-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
            <div className="flex justify-center space-x-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="/facebook-icon.png" alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src="/twitter-icon.png" alt="Twitter" className="w-8 h-8" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="/instagram-icon.png" alt="Instagram" className="w-8 h-8" />
                </a>
            </div>
            <p className="text-center text-sm mt-4">
                2025 Pop Verse - Todos los derechos reservados
            </p>
        </footer>
    );
}
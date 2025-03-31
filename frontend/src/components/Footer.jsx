import React from "react";

export default function Footer({ darkMode }) {
    return (
        <footer className={`py-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
            {/* Container for social media icons */}
            <div className="flex justify-center items-center space-x-6">
                {["facebook", "twitter", "instagram"].map((platform) => (
                    <a
                        key={platform}
                        href={`https://${platform}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={`/${platform}-icon.png`}
                            alt={platform}
                            className={`w-8 h-8 transition duration-300 ${
                                darkMode ? "invert" : ""
                            }`}
                        />
                    </a>
                ))}
            </div>

            {/* Footer Text */}
            <p className="text-center text-sm mt-4">
                2025 Pop Verse - Todos los derechos reservados
            </p>
        </footer>
    );
}
import React from "react";

export default function Newsletter( darkMode ) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500">
                📩 {/* Placeholder for an image */}
            </div>
            <div className="text-center sm:text-left sm:ml-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Newsletter</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">RECIBE INFORMACIÓN DE NUESTROS PRODUCTOS Y PROMOCIONES. SE EL PRIMERO EN ENTERARTE DE TODO!!</p>
                <div className="mt-3 flex">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-2 rounded-l-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../services/api";
import CardProduct from "../components/CardProduct";

const SearchResults = ({ darkMode }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q"); // Obtener el término de búsqueda de la URL
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products"); // Llamada a la API para obtener todos los productos
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (query) {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [query, products]);

    return (
        <div className={`container ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <h1 className="text-center my-4">Resultados de búsqueda para: "{query}"</h1>
            <div className="row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <CardProduct product={product} darkMode={darkMode} />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
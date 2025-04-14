import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import { api } from "../services/api";

const Category = ({ darkMode }) => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState("price");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(
            (product) =>
                product.category.toLowerCase() === categoryName.toLowerCase() &&
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products, categoryName, searchTerm]);

    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];
        if (sortBy === "price") {
            return sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === "alphabetical") {
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
        return sorted;
    }, [filteredProducts, sortBy]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <div className={`container ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <h1 className="text-center my-4">
                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </h1>

            {/* Search bar */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filtrar productos..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Sorting options */}
            <div className="mb-4">
                <select className="form-select" value={sortBy} onChange={handleSortChange}>
                    <option value="price">Ordenar por Precio</option>
                    <option value="alphabetical">Ordenar Alfabéticamente</option>
                </select>
            </div>

            {/* Product grid */}
            <div className="row">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" key={product.id}>
                            <CardProduct product={product} darkMode={darkMode} />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No se encontraron productos en esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default Category;

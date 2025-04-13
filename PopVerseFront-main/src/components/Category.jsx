import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../components/CardProduct"; // Import your CardProduct component
import { api } from "../services/api";

const Category = ({ darkMode }) => {
    const { categoryName } = useParams(); // Capture the category name from the URL
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState("price"); // Default sorting by price
    const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products"); // Endpoint de productos
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Filter and sort products based on category and search term
    useEffect(() => {
        const filtered = products.filter(
            (product) => product.category.toLowerCase() === categoryName.toLowerCase() && 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products, categoryName, searchTerm]);

    // Sorting functionality (memoized)
    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];
        if (sortBy === "price") {
            return sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === "alphabetical") {
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
        return sorted;
    }, [filteredProducts, sortBy]);

    // Handle search term change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle sort option change
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <div className={`container ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <h1 className="text-center my-4">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>

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
                    <option value="alphabetical">Ordenar Alfabeticamente</option>
                </select>
            </div>

            {/* Product grid */}
            <div className="row">
                {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <CardProduct product={product} darkMode={darkMode} />
                    </div>
                ))
                ) : (
                <p className="text-center">No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default Category;

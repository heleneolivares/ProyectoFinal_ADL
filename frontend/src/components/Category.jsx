import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import CardProduct from "../components/CardProduct"; // Import your CardProduct component

const Category = ({ darkMode }) => {
    const { categoryName } = useParams(); // Capture the category name from the URL
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState("price"); // Default sorting by price
    const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering

  // Mock product data (you can replace this with an API call)
    const mockProducts = [
        { id: 1, name: "Super Mario", price: 50, category: "videogames", image: "https://example.com/mario.png" },
        { id: 2, name: "Dragon Ball Z", price: 30, category: "anime", image: "https://example.com/dbz.png" },
        { id: 3, name: "Pokémon Pikachu", price: 40, category: "pokemon", image: "https://example.com/pikachu.png" },
        { id: 4, name: "The Witcher 3", price: 60, category: "videogames", image: "https://example.com/witcher3.png" },
        { id: 5, name: "Attack on Titan", price: 35, category: "anime", image: "https://example.com/aot.png" },
        { id: 6, name: "Football - Messi Jersey", price: 100, category: "sport", image: "https://example.com/messi.png" },
        // Add more mock products here as needed
    ];

  // Filter and sort products based on category and search term
    useEffect(() => {
        const filtered = mockProducts.filter(
            (product) => product.category === categoryName && product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [categoryName, searchTerm]);

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
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
            />
        </div>

        {/* Sorting options */}
        <div className="mb-4">
            <select className="form-select" value={sortBy} onChange={handleSortChange}>
            <option value="price">Sort by Price</option>
            <option value="alphabetical">Sort Alphabetically</option>
            </select>
        </div>

        {/* Product grid */}
        <div className="row">
            {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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

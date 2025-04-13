import React, { useContext, useState, useEffect } from "react";
import CardWishlistItem from "../components/CardWishlistItem";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";
import SidebarAccount from "../components/SidebarAccount"; 

const Wishlist = ({ darkMode }) => {
    const { token } = useContext(UserContext);
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        const wishlistProducts = async () => {
            try {
                const response = await api.get("/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFavs(response.data.favorites);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        wishlistProducts();
    }, []);

    return (
        <div className="container mt-4 d-flex">
            {/* ✅ Sidebar reutilizable */}
            <SidebarAccount activePage="wishlist" darkMode={darkMode} />

            {/* 📝 Wishlist Items */}
            <div className="col-md-9 p-3">
                <h1>Wishlist</h1>
                <div className="d-flex flex-column gap-3">
                    {favs.length > 0 ? (
                        favs.map((product) => (
                            <CardWishlistItem
                                key={product.id}
                                product={product}
                                darkMode={darkMode}
                            />
                        ))
                    ) : (
                        <p>No hay favoritos para el usuario</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;

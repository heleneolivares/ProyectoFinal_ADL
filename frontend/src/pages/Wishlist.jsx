import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardWishlistItem from "../components/CardWishlistItem";
const mockProducts = [
    {
        id: 1,
        name: "POP! ACES HIGH EDDIE",
        brand: "Iron Maiden",
        price: "16.990",
        image: "https://your-image-url.com/eddie.png",
    },
    {
        id: 2,
        name: "POP! SPIDER-MAN",
        brand: "Marvel",
        price: "17.500",
        image: "https://your-image-url.com/spiderman.png",
    },
];
const Wishlist = () =>{
    return(
        <>
            <h1>Wishlist</h1>
            <div className="d-flex flex-column gap-3">
                {mockProducts.map((product) => (
                    <CardWishlistItem
                        key={product.id}
                        product={product}
                        darkMode={false} // Adjust darkMode based on user preferences
                    />
                ))}
            </div>
        </>
    )
}

export default Wishlist
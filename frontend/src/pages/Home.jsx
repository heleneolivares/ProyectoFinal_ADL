import React, { useContext } from "react";
import HeroCarousel from "../components/HeroCarousel";
import Title from "../components/Title";
import CardProduct from "../components/CardProduct";


export default function Home({ darkMode }) {
    // Mock product data (replace with API data later)
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
        {
            id: 3,
            name: "POP! GOKU ULTRA INSTINCT",
            brand: "Dragon Ball",
            price: "18.990",
            image: "https://your-image-url.com/goku.png",
        },
    ];

    return (
        <div>
            <HeroCarousel darkMode={darkMode} />
            <Title text="New Arrivals" size="lg" align="center" darkMode={darkMode} />
            <div className="container py-4">
                <div className="row justify-content-center">
                    {mockProducts.map((product) => (
                        <div key={product.id} className="col-md-4 d-flex justify-content-center mb-4">
                            <CardProduct product={product} darkMode={darkMode} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Banner */}
            <Title text="Ofertas" size="lg" align="center" darkMode={darkMode} />
            <div className="container py-4">
                <div className="row justify-content-center">
                    {mockProducts.map((product) => (
                        <div key={product.id} className="col-md-4 d-flex justify-content-center mb-4">
                            <CardProduct product={product} darkMode={darkMode} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Newsletter */}
            {/* Footer */}
        </div>
    );
}
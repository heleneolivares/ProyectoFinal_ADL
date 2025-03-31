import React, { useState, useEffect, useContext } from "react";
import HeroCarousel from "../components/HeroCarousel";
import Title from "../components/Title";
import CardProduct from "../components/CardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home({ darkMode }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        {
            id: 4,
            name: "POP! BATMAN",
            brand: "DC Comics",
            price: "19.500",
            image: "https://your-image-url.com/batman.png",
        },
    ];

    return (
        <div>
            <HeroCarousel darkMode={darkMode} />
            <Title text="New Arrivals" size="lg" align="center" darkMode={darkMode} />
            <div className="container py-4">
                {isMobile ? (
                    // 📌 Mobile: Show as a Swiper Carousel
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1.2} // Show part of the next slide
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                    >
                        {mockProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="d-flex justify-content-center">
                                    <CardProduct product={product} darkMode={darkMode} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    // 💻 Desktop: Show as a Grid
                    <div className="row justify-content-center">
                        {mockProducts.map((product) => (
                            <div key={product.id} className="col-md-4 d-flex justify-content-center mb-4">
                                <CardProduct product={product} darkMode={darkMode} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Banner imageUrl="https://example.com/banner.jpg"/>
            <Title text="Ofertas" size="lg" align="center" darkMode={darkMode} />
            <div className="container py-4">
                {isMobile ? (
                    // 📌 Mobile: Show as a Swiper Carousel
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1.2} // Show part of the next slide
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                    >
                        {mockProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="d-flex justify-content-center">
                                    <CardProduct product={product} darkMode={darkMode} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    // 💻 Desktop: Show as a Grid
                    <div className="row justify-content-center">
                        {mockProducts.map((product) => (
                            <div key={product.id} className="col-md-4 d-flex justify-content-center mb-4">
                                <CardProduct product={product} darkMode={darkMode} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Newsletter/>
            <Footer darkMode={darkMode} />
        </div>
    );
}
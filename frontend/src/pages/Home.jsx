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
import { api } from "../services/api";

export default function Home({ darkMode }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                        {products.map((product) => (
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
                        {products.map((product) => (
                            <div key={product.id} className="col-md-4 d-flex justify-content-center mb-4">
                                <CardProduct product={product} darkMode={darkMode} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Banner src="/banner.png"/>
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
                        {products.map((product) => (
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
                        {products.map((product) => (
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
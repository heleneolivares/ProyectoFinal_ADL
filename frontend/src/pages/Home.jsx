import React, { useState, useEffect } from "react";
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

  const mockProducts = [
    {
      id: 1,
      name: "POP! ACES HIGH EDDIE",
      brand: "Iron Maiden",
      price: "16.990",
      image: "",
    },
    {
      id: 2,
      name: "POP! SPIDER-MAN",
      brand: "Marvel",
      price: "17.500",
      image: "",
    },
    {
      id: 3,
      name: "POP! GOKU ULTRA INSTINCT",
      brand: "Dragon Ball",
      price: "18.990",
      image: "",
    },
    {
      id: 4,
      name: "POP! BATMAN",
      brand: "DC Comics",
      price: "19.500",
      image: "",
    },
    {
      id: 5,
      name: "POP! MESSI",
      brand: "INTER MIAMI",
      price: "19.500",
      image: "",
    },
    {
      id: 6,
      name: "POP! CR7",
      brand: "INTER MIAMI",
      price: "19.500",
      image: "",
    },
    {
      id: 7,
      name: "POP! SPIDERM",
      brand: "DC Comics",
      price: "19.500",
      image: "",
    },
  ];

  return (
    <div>
      <HeroCarousel darkMode={darkMode} />

      {/* NEW ARRIVALS */}
      <Title text="New Arrivals" size="lg" align="center" darkMode={darkMode} />
      <div className="container py-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={isMobile ? 2 : 4}
          slidesPerGroup={1}
          pagination={false}
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
      </div>

      {/* BANNER */}
      <Banner src="/images/banner.jpg" />

      {/* OFERTAS */}
      <Title text="Ofertas" size="lg" align="center" darkMode={darkMode} />
      <div className="container py-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={isMobile ? 2 : 4}
          slidesPerGroup={1}
          pagination={false}
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
      </div>

      <Newsletter />
      <Footer darkMode={darkMode} />
    </div>
  );
}

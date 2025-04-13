import React, { useState, useEffect } from "react";
import HeroCarousel from "../components/HeroCarousel";
import Title from "../components/Title";
import CardProduct from "../components/CardProduct";
import DiscountCardProduct from "../components/DiscountCardProduct";
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
  // 🧠 Estados para responsividad y productos
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());
  const [products, setProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);

  // 🧩 Función para determinar cuántos slides mostrar según tamaño de pantalla
  function getSlidesPerView() {
    const width = window.innerWidth;
    if (width < 768) return 2;
    if (width < 992) return 3;
    return 4;
  }

  // 🧩 Escuchar cambios de tamaño para ajustar slidesPerView e isMobile
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📦 Fetch productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentProducts = response.data.filter((product) => {
          const createdAt = new Date(product.created_at);
          return createdAt >= sevenDaysAgo;
        });

        const discProducts = response.data.filter((product) => product.discount > 0);

        setDiscountProducts(discProducts);
        setRecentProducts(recentProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <HeroCarousel darkMode={darkMode} />

      {/* 🔥 NEW ARRIVALS */}
      <Title text="New Arrivals" size="lg" align="center" darkMode={darkMode} />
      <div className="container py-4">
        <Swiper
          spaceBetween={10}
          slidesPerView={slidesPerView} // ✅ dinámico
          slidesPerGroup={1}
          pagination={false} // ✅ sin puntitos abajo
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {recentProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="d-flex justify-content-center">
                <CardProduct product={product} darkMode={darkMode} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Esto queda comentado por si decides usar grilla: */}
        {/* <div className="row justify-content-center">...</div> */}
      </div>

      {/* 🖼️ BANNER */}
      <Banner src="/banner.png" />

      {/* 🔖 OFERTAS */}
      <Title text="Ofertas" size="lg" align="center" darkMode={darkMode} />
      <div className="container py-4">
        {isMobile ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1.2}
            pagination={false} // ✅ quitar los puntitos aquí también
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {discountProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="d-flex justify-content-center">
                  <DiscountCardProduct product={product} darkMode={darkMode} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="row justify-content-center">
            {discountProducts.map((product) => (
              <div key={product.id} className="col-md-4 d-flex justify-content-center mb-4">
                <DiscountCardProduct product={product} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Newsletter />
      <Footer darkMode={darkMode} />
    </div>
  );
}

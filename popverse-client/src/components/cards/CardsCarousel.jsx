import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import products from "../../data/products";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
};

export default function CardsCarousel() {
  const newProducts = products.filter((product) => product.isNew);

  return (
    <section className="container my-5">
      <h3 className="mb-4 fw-bold">New arrivals</h3>

      <Carousel
        responsive={responsive}
        infinite
        arrows
        autoPlay={false}
        className="pb-2"
      >
        {newProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </Carousel>
    </section>
  );
}

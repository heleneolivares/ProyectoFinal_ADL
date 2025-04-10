import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ image, name, price }) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div
      className="card position-relative text-center border-0 shadow-sm product-card"
      style={{ maxWidth: "280px", transition: "all 0.3s" }}
    >
      <div
        onClick={() => setIsFav(!isFav)}
        style={{ cursor: "pointer" }}
        className="position-absolute top-0 end-0 m-2 fs-5"
      >
        {isFav ? (
          <FaHeart className="text-danger" />
        ) : (
          <FaRegHeart className="text-secondary" />
        )}
      </div>

      <img src={image} className="card-img-top rounded-3" alt={name} />

      <div className="card-body p-2">
        <h6 className="card-title text-uppercase fw-bold">{name}</h6>
        <p className="text-primary fw-bold">${price}</p>
        <button className="btn btn-primary btn-sm">Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;

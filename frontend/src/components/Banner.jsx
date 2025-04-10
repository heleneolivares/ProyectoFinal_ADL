import React from "react";

export default function Banner({ src, altText = "Banner" }) {
  return (
    <div
      style={{
        width: "100vw", // ancho igual al HeroCarousel
        overflow: "hidden", // para evitar scroll horizontal si se pasa
      }}
    >
      <img
        src={src}
        alt={altText}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

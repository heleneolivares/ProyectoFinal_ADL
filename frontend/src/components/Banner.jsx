import React from "react";

export default function Banner({ imageUrl, altText = "Banner" }) {
    return (
        <div className="w-full">
            <img
                src={imageUrl}
                alt={altText}
                className="w-full h-[300px] object-cover sm:h-[500px]"
            />
        </div>
    );
}
import React from "react";

export default function Title({ text, size = "lg", align = "center", darkMode }) {
    const alignmentClass = align === "left" ? "text-start" : align === "right" ? "text-end" : "text-center";
    return (
            <h2 className={`title ${size} ${alignmentClass} ${darkMode ? "dark-mode" : "light-mode"}`}>
                {text}
            </h2>
    );

}
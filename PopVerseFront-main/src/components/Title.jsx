import React from "react";

export default function Title({ text, size = "lg", align = "center", darkMode }) {
    const alignmentClass = align === "left" ? "text-start" : align === "right" ? "text-end" : "text-center";
    return (
            <h2 className={`text-${align} fs-${size} fw-bold ${darkMode ? "text-white" : "text-dark"} my-4`}>
                {text}
            </h2>
    );

}
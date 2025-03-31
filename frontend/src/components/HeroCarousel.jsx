import React from "react";
import "../assets/css/HeroCarousel.css";

export default function HeroCarousel({ darkMode }) {
    return (
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className={darkMode ? "active dark-indicator" : "active light-indicator"}></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" className={darkMode ? "dark-indicator" : "light-indicator"}></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" className={darkMode ? "dark-indicator" : "light-indicator"}></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="3" className={darkMode ? "dark-indicator" : "light-indicator"}></button>
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/images/hero1.jpg" className="d-block w-100" alt="Hero Image 1" />
                </div>
                <div className="carousel-item">
                    <img src="/images/hero2.jpg" className="d-block w-100" alt="Hero Image 2" />
                </div>
                <div className="carousel-item">
                    <img src="/images/hero3.jpg" className="d-block w-100" alt="Hero Image 3" />
                </div>
                <div className="carousel-item">
                    <img src="/images/hero4.jpg" className="d-block w-100" alt="Hero Image 4" />
                </div>
            </div>

            {/* Navigation Arrows */}
            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span className={`carousel-control-prev-icon ${darkMode ? "dark-arrow" : "light-arrow"}`}></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span className={`carousel-control-next-icon ${darkMode ? "dark-arrow" : "light-arrow"}`}></span>
            </button>
        </div>
    );
}
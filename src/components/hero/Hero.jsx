import { useState, useEffect, useCallback } from "react";
import "./Hero.css";
import mainPoster from "../../assets/mainPoster.webp";
import nvidia from "../../assets/nvidia.webp";
import neo from "../../assets/neo.webp";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const posters = [
    { id: 1, src: mainPoster, alt: "Aura Store Main Poster" },
    { id: 2, src: nvidia, alt: "Nvidia Promotion" },
    { id: 3, src: neo, alt: "mac neon" },
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + posters.length) % posters.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [handleNext, currentIndex]);


    return (
        <div className="hero-container">
            <div className="container-head">
                <h1>Aura Store</h1>
                <p>Explore 5-star products.</p>
            </div>
            <div className="poster-imgs">
                <div className="controllers">
                    <button onClick={handlePrev} aria-label="Previous Poster">
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} aria-label="Next Poster">
                        <FaAngleRight />
                    </button>
                </div>
                <div
                    className="slider"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {posters.map((poster) => (
                        <img key={poster.id} src={poster.src} alt={poster.alt} />
                    ))}
                </div>
                <div className="dots-container">
                    {posters.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${index === currentIndex ? "active" : ""}`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            {index === currentIndex && <div className="dot-progress" />}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}


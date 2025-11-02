import React, { useState, useEffect } from "react";

/**
 * HeroSection Component
 *
 * @returns {JSX.Element} Hero section with background and CTA button
 */
const HeroSection = () => {
 
  const images = [
    "/assets/images/vegi.jpg",
    "/assets/images/woman.jpg",
    "/assets/images/Grocery-Marketplace.png",
  ];

  // Track current image index
  const [currentImage, setCurrentImage] = useState(0);

  // Change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className="relative bg-cover bg-center h-[32rem] flex items-center justify-center text-white transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 text-yellow-400 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Shop Fresh, Eat Healthy
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-yellow-400">
          Your neighborhood's trusted online grocery marketplace.
        </p>
        <a
          href="/products"
          className="inline-block bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-700 transition-colors shadow-lg"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

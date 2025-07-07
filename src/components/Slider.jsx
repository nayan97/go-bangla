import React, { useEffect, useState } from "react";
import TypeWriter from "./TypeWriter";

const slides = [
  {
    id: "slide1",
    img: "https://i.ibb.co/BKBhG6sg/istockphoto-2203738421-2048x2048.jpg",
    title: "Explore Beautiful Bangladesh",
    subtitle: "Discover culture, history & natural beauty",
  },
  {
    id: "slide2",
    img: "https://i.ibb.co/wZ9pgQZ5/istockphoto-2148178476-2048x2048.jpg",
    title: "Adventures Await",
    subtitle: "From the hills to the sea, adventure calls",
  },
  {
    id: "slide3",
    img: "https://i.ibb.co/BVShQqWj/photo-1605379399642-870262d3d051.jpg",
    title: "Taste Local Flavors",
    subtitle: "Enjoy authentic Bangladeshi cuisine",
  },
  {
    id: "slide4",
    img: "https://i.ibb.co/9mMmrMH5/premium-photo-1678565879444-f87c8bd9f241.jpg",
    title: "Unforgettable Journeys",
    subtitle: "Create memories that last a lifetime",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideElement = document.getElementById(slides[current].id);
    slideElement?.scrollIntoView({ behavior: "smooth" });
  }, [current]);

  return (
    <div className="carousel w-full rounded-lg overflow-hidden">
      {slides.map((slide, index) => (
        <div
          id={slide.id}
          key={slide.id}
          className="carousel-item relative w-full h-[500px]"
        >
          {/* Background Image */}
          <img
            src={slide.img}
            className="w-full h-full object-cover"
            alt="Slide"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-xl mb-6 drop-shadow-md">{slide.subtitle}</p>
            <TypeWriter />
          </div>

          {/* Navigation */}
          <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2 z-20">
            <a
              href={`#${slides[(index - 1 + slides.length) % slides.length].id}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#${slides[(index + 1) % slides.length].id}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

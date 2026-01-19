// src/components/home/Hero.tsx
import React, { useState, useEffect } from 'react';
import banner1 from '../../assets/banner1.png'; 
import banner2 from '../../assets/banner2.png';

const Hero: React.FC = () => {

  const banners = [
    banner1, 
    banner2
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-full h-[200px] md:h-[400px] lg:h-[550px] w-full m-auto relative group">
      
      <div
        style={{ backgroundImage: `url(${banners[currentIndex]})` }}
        className="w-full h-full bg-center bg-cover duration-500 transition-all ease-in-out cursor-pointer"
        onClick={() => console.log('Click banner!')}
      ></div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-all">
        <button onClick={prevSlide} className="w-8 h-8 flex items-center justify-center">
          ❮
        </button>
      </div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-all">
        <button onClick={nextSlide} className="w-8 h-8 flex items-center justify-center">
          ❯
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center py-2">
        {banners.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`text-2xl cursor-pointer mx-2 transition-all ${
              currentIndex === slideIndex ? 'text-blue-600 scale-125' : 'text-gray-400/70'
            }`}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
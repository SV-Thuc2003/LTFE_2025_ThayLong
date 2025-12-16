// src/components/home/Hero.tsx
import React from 'react';

const Hero: React.FC = () => (
  <section className="relative w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}>
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Milk Powder Store</h1>
        <p className="mt-2 text-lg">Chất lượng chính hãng - Giá tốt mỗi ngày</p>
      </div>
    </div>
  </section>
);

export default Hero;

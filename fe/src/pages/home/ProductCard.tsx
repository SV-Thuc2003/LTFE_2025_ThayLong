// src/components/home/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => (
  <Link to={`/product/${id}`} className="block border rounded-lg overflow-hidden hover:shadow-lg transition">
    <img src={image} alt={name} className="w-full h-40 object-cover" />
    <div className="p-3">
      <h3 className="text-sm font-medium">{name}</h3>
      <p className="mt-1 font-semibold text-[#e63946]">{price.toLocaleString()}₫</p>
    </div>
  </Link>
);

export default ProductCard;

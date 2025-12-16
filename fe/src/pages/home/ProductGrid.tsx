// src/components/home/ProductGrid.tsx
import React from "react";
import ProductCard from "./ProductCard";

// Demo products array
const PRODUCT_DEMO = Array.from({ length: 8 }).map((_, index) => ({
  id: index + 1,
  name: `Sản phẩm ${index + 1}`,
  price: 299000 + index * 5000,
  image: "/images/product-demo.jpg",
}));

interface ProductGridProps {
  title: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title }) => (
  <section className="container mx-auto px-6 lg:px-0">
    <h2 className="text-xl font-semibold mb-6">{title}</h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {PRODUCT_DEMO.map((prod) => (
        <ProductCard key={prod.id} {...prod} />
      ))}
    </div>
  </section>
);

export default ProductGrid;

// src/components/home/CategoryList.tsx
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Sữa bột", href: "/category/sua-bot" },
  { name: "Sữa cho bé", href: "/category/cho-be" },
  { name: "Sữa cho mẹ", href: "/category/cho-me" },
  { name: "Khuyến mãi", href: "/category/sale" },
];

const CategoryList: React.FC = () => (
  <section className="container mx-auto px-6 lg:px-0">
    <h2 className="text-2xl font-semibold mb-6">Danh mục sản phẩm</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <Link
          to={cat.href}
          key={cat.name}
          className="p-4 text-center bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryList;

// src/components/product/ProductSearch.tsx
import React from "react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ value, onChange }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Tìm sản phẩm..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
    />
  </div>
);

export default ProductSearch;

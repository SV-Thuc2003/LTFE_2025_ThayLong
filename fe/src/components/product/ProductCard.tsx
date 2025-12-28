import { Link } from "react-router-dom";
import type { ProductListResponse } from "../../types/product-response";

interface Props {
  product: ProductListResponse;
}

const ProductCard = ({ product }: Props) => {
  return (
     <Link to={`/product/${product.slug}`}>
      <div className="border rounded-lg p-3 hover:shadow-md transition bg-white">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-40 object-contain mb-2"
        />

        <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        <p className="text-red-600 font-semibold mt-1">
          {product.price.toLocaleString()} đ
        </p>

        <p className="text-xs text-gray-500">
          {product.brandName}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

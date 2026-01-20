import { Link } from "react-router-dom";
import type { ProductListResponse } from "../../types/product-response";

interface Props {
  product: ProductListResponse;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link to={`/product/${product.slug}`} className="group">
      <div
        className="border rounded-lg p-3 bg-white transition-all duration-300 ease-out cursor-pointer hover:bg-rose-50 hover:shadow-lg hover:scale-[1.03]"
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-40 object-contain mb-2 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        <h3 className="text-sm font-medium line-clamp-2 min-h-[40px] transition-colors group-hover:text-rose-600">
          {product.name}
        </h3>

        <p className="text-red-600 font-semibold mt-1 transition-colors group-hover:text-red-700">
          {product.price.toLocaleString()} đ
        </p>

        <p className="text-xs text-gray-500">{product.brandName}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

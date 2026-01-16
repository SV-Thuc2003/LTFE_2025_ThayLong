import React from "react";
import type { CartItem } from "../../types/cart";
import { Link } from "react-router-dom";

interface ProductItemProps {
  item: CartItem;
  onRemove: (cartItemId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  item,
  onRemove,
  onQuantityChange,
}) => {
  const product = item.product;

  if (!product) {
    return (
      <tr>
        <td colSpan={6} className="py-6 text-center text-gray-400">
          Đang tải sản phẩm...
        </td>
      </tr>
    );
  }

  const thumbnail =
    product.images?.find((img) => img.isThumbnail)?.imageUrl ??
    product.images?.[0]?.imageUrl ??
    "https://placehold.co/150x150?text=No+Image";

  const handleIncrement = () => {
    onQuantityChange(product.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(product.id, item.quantity - 1);
    } else {
      if (window.confirm("Xóa sản phẩm này?")) onRemove(item.id);
    }
  };

  return (
    <tr className="border-b border-[#a48c8ca8] hover:bg-gray-50 transition">
      <td className="py-4 border-r border-[#a48c8ca8] w-[80px] text-center">
        <button
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center
                     text-gray-400 hover:text-red-600 hover:border-red-600 transition"
        >
          ×
        </button>
      </td>

      <td className="py-4 border-r border-[#a48c8ca8] w-[120px] text-center">
        <Link to={`/product/${product.slug}`}>
          <img
            src={thumbnail}
            alt={product.name}
            className="w-[90px] h-[90px] object-contain mx-auto border rounded bg-white"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/150x150?text=No+Image";
            }}
          />
        </Link>
      </td>

      <td className="py-4 border-r border-[#a48c8ca8] px-4">
        <Link
          to={`/product/${product.slug}`}
          className="text-[#334862] text-lg font-medium hover:text-rose-600
                     transition block line-clamp-2"
        >
          {product.name}
        </Link>
      </td>

      <td className="py-4 border-r border-[#a48c8ca8] w-[130px] text-center">
        <p className="text-base font-bold text-[#111111]">
          {product.price.toLocaleString()} ₫
        </p>
      </td>

      <td className="py-4 border-r border-[#a48c8ca8] w-[140px] text-center">
        <div className="flex items-center justify-center">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-l
                       hover:bg-gray-200 text-xl"
          >
            -
          </button>

          <div className="w-10 h-8 border-t border-b border-gray-300 flex
                          items-center justify-center bg-white">
            <span className="text-base font-medium">{item.quantity}</span>
          </div>

          <button
            onClick={handleIncrement}
            className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-r
                       hover:bg-gray-200 text-xl"
          >
            +
          </button>
        </div>
      </td>

      <td className="py-4 w-[140px] text-center">
        <p className="text-base font-bold text-rose-600">
          {(product.price * item.quantity).toLocaleString()} ₫
        </p>
      </td>
    </tr>
  );
};

export default ProductItem;

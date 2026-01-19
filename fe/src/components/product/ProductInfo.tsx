import type { ProductDetailResponse } from "../../types/product-response";
import { useCart } from "../../hooks/useCart.tsx";

interface Props {
  product: ProductDetailResponse;
}

const ProductInfo = ({ product }: Props) => {
  const { addToCart } = useCart();
  return (
    <div>
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <p className="text-gray-500 mt-1">
        Thương hiệu: <b>{product.brand}</b> | Danh mục: <b>{product.category}</b>
      </p>

      <p className="text-2xl text-red-600 font-semibold mt-4">
        {product.price.toLocaleString()} ₫
      </p>

      <div className="mt-6">

        {/* <button className="bg-rose-600 text-white px-6 py-3 rounded"> */}

        <button
          onClick={async () => { 
            const token = localStorage.getItem("token");

            if (!token) {
              alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
              return;
            }

            try {
              await addToCart(product.id, 1);
              alert("Đã thêm sản phẩm vào giỏ hàng!");
            } catch (error) {
              console.error("Lỗi thêm giỏ hàng:", error);
              alert("Có lỗi xảy ra, vui lòng thử lại.");
            }
          }}
          className="bg-rose-600 text-white px-6 py-3 rounded hover:bg-rose-700 transition-colors cursor-pointer"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;

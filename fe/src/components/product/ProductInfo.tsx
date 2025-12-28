import type { ProductDetailResponse } from "../../types/product-response";

interface Props {
  product: ProductDetailResponse;
}

const ProductInfo = ({ product }: Props) => {
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
        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;

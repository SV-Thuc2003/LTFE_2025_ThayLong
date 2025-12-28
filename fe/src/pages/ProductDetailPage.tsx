import { useParams } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductAttributes from "../components/product/ProductAttributes";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProductDetail(slug);

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      {/* MÔ TẢ */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* THUỘC TÍNH */}
      <ProductAttributes attributes={product.attributes} />
    </div>
  );
};

export default ProductDetailPage;

import ProductCard from "./ProductCard";
import type { ProductListResponse } from "../../types/product-response";

interface Props {
  products: ProductListResponse[];
}
const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductGrid;

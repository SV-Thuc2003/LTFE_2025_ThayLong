import { useState } from "react";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { useProducts } from "../../hooks/useProducts";
import type { ProductSort } from '../../types/product-sort';

interface ProductListProps {
  keyword?: string;
  categorySlug?: string;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  pageSize?: number;
  showPagination?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  keyword,
  categorySlug,
  brandId,
  minPrice,
  maxPrice,
  sort,
  pageSize = 12,
  showPagination = true,
}) => {
  const [page, setPage] = useState(0);

  const { products, totalPages, loading, error } = useProducts({
    keyword,
    categorySlug,
    brandId,
    minPrice,
    maxPrice,
    sort,
    page,
    size: pageSize,
  });

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <ProductGrid products={products} />

      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onChange={(p) => setPage(p - 1)}
        />
      )}
    </>
  );
};

export default ProductList;

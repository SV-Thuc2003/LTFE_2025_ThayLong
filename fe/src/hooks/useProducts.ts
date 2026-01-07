// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import type { ProductListResponse, Page } from "../types/product-response";

interface UseProductsParams {
  page?: number;
  size?: number;
  sort?: 'newest' | 'priceAsc' | 'priceDesc';
  categorySlug?: string; // sửa từ categoryId => categorySlug
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export const useProducts = ({
  page = 0,
  size = 12,
  sort = 'newest',
  categorySlug,
  brandId,
  minPrice,
  maxPrice,
}: UseProductsParams) => {
  const [data, setData] = useState<Page<ProductListResponse>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getProducts({
      page,
      size,
      sort,
      categorySlug,
      brandId,
      minPrice,
      maxPrice,
    })
      .then(res => setData(res))
      .catch(() => setError("Không thể tải sản phẩm"))
      .finally(() => setLoading(false));
  }, [page, size, sort, categorySlug, brandId, minPrice, maxPrice]);

  return {
    products: data?.content || [],
    totalPages: data?.totalPages || 0,
    currentPage: data?.number || 0,
    loading,
    error,
  };
};

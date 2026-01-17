// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import type { ProductListResponse, Page } from "../types/product-response";
import type { ProductSort } from "../types/product-sort";

interface UseProductsParams {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: ProductSort;
  categorySlug?: string;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export const useProducts = ({
  keyword,
  page = 0,
  size = 12,
  sort = 'default',
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
      keyword,
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
  }, [keyword, page, size, sort, categorySlug, brandId, minPrice, maxPrice]);

  return {
    products: data?.content || [],
    totalPages: data?.totalPages || 0,
    currentPage: data?.number || 0,
    loading,
    error,
  };
};

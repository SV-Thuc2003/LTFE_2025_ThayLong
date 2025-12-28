import { useEffect, useState } from "react";
import { getProductDetail } from "../services/productApi";
import type { ProductDetailResponse } from "../types/product-response";

export const useProductDetail = (slug?: string) => {
  const [product, setProduct] = useState<ProductDetailResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    getProductDetail(slug)
      .then(res => setProduct(res))
      .catch(() => setError("Không thể tải chi tiết sản phẩm"))
      .finally(() => setLoading(false));
  }, [slug]);

  return { product, loading, error };
};

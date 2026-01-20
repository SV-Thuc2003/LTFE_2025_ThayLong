import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "../components/product/ProductList";
// import Breadcrumbs, { BreadcrumbItem } from "../components/common/Breadcrumb";
// import default bình thường
import Breadcrumbs from "../components/common/Breadcrumb";

// import type riêng
import type { BreadcrumbItem } from "../components/common/Breadcrumb";

import ProductFilter from "../components/product/ProductFilter";
import { CATEGORY_MAP } from "../constants/categories";
import type { ProductSort } from "../types/product-sort";
import type { Brand } from "../types/brand";
import axios from "../Service/axios.ts";

const ProductPage = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || undefined;

  const categoryName = categorySlug ? CATEGORY_MAP[categorySlug] : undefined;

  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandId, setBrandId] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [sort, setSort] = useState<ProductSort>("newest");

  useEffect(() => {
    axios.get("/brands")
        .then((res) => {
          setBrands(res.data);
        })
        .catch((err) => {
          console.error("Lỗi lấy brands:", err);
        });
  }, []);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang chủ", path: "/" },
    { label: "Sữa bột", path: "/products" },
  ];

  if (categoryName) {
    breadcrumbItems.push({ label: categoryName });
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* BREADCRUMB */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex gap-6">
        {/* SIDEBAR FILTER */}
        <ProductFilter
          brands={brands}
          brandId={brandId}
          setBrandId={setBrandId}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          sort={sort}
          setSort={setSort}
        />

        {/* PRODUCT LIST */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">
            {categoryName || "Tất cả sữa bột"}
          </h1>

          <ProductList
            keyword={keyword}
            categorySlug={categorySlug}
            brandId={brandId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sort={sort}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

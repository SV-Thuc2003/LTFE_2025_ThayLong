import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductList from "../components/product/ProductList";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductFilter from "../components/product/ProductFilter";
import { CATEGORY_MAP } from "../constants/categories";
import type { ProductSort } from "../types/product-sort";

const ProductPage = () => {
  const { categorySlug } = useParams();

  const categoryName = categorySlug
    ? CATEGORY_MAP[categorySlug]
    : undefined;

  const [brandId, setBrandId] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [sort, setSort] = useState<ProductSort>("newest");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* BREADCRUMB */}
      <Breadcrumb categoryName={categoryName} />

      <div className="flex gap-6">
        {/* SIDEBAR FILTER */}
        <ProductFilter
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

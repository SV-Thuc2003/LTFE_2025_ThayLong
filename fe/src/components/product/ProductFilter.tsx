import { useState, useEffect } from "react";
import type { Brand } from "../../types/product";
import type { ProductSort } from "../../types/product-sort";

interface Props {
  brands: Brand[];

  brandId?: number;
  setBrandId: (v?: number) => void;

  minPrice?: number;
  maxPrice?: number;
  setMinPrice: (v?: number) => void;
  setMaxPrice: (v?: number) => void;

  sort: ProductSort;
  setSort: (v: ProductSort) => void;
}

const pricePresets = [
  { label: "< 200.000", min: 0, max: 200000 },
  { label: "200.000 - 400.000", min: 200000, max: 400000 },
  { label: "400.000 - 600.000", min: 400000, max: 600000 },
  { label: "> 600.000", min: 600000, max: undefined },
];

const sortOptions: { label: string; value: ProductSort }[] = [
  { label: "Mặc định", value: "default" },
  { label: "Tên A-Z", value: "nameAsc" },
  { label: "Tên Z-A", value: "nameDesc" },
  { label: "Hàng mới", value: "newest" },
  { label: "Giá thấp đến cao", value: "priceAsc" },
  { label: "Giá cao xuống thấp", value: "priceDesc" },
];

const ProductFilter = ({
  brands,
  brandId,
  setBrandId,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  sort,
  setSort,
}: Props) => {
  const [localBrandId, setLocalBrandId] = useState<number | undefined>(brandId);
  const [localMinPrice, setLocalMinPrice] = useState<number | undefined>(
    minPrice
  );
  const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>(
    maxPrice
  );
  const [localSort, setLocalSort] = useState<ProductSort>(sort);

  useEffect(() => {
    setLocalBrandId(brandId);
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
    setLocalSort(sort);
  }, [brandId, minPrice, maxPrice, sort]);

  const applyFilters = () => {
    setBrandId(localBrandId);
    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
    setSort(localSort);
  };

  const resetFilters = () => {
    setLocalBrandId(undefined);
    setLocalMinPrice(undefined);
    setLocalMaxPrice(undefined);
    setLocalSort("default");

    setBrandId(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSort("default");
  };

  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-5 space-y-6">
      {/* BRAND */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Thương hiệu
        </h3>
        {!brands.length ? (
          <div className="h-10 bg-gray-200 animate-pulse rounded" />
        ) : (
          <select
            value={localBrandId ?? ""}
            onChange={(e) =>
              setLocalBrandId(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Tất cả</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* PRICE */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Khoảng giá (VNĐ)
        </h3>
        <div className="flex space-x-2 mb-2">
          <input
            type="number"
            placeholder="Từ"
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={localMinPrice ?? ""}
            onChange={(e) =>
              setLocalMinPrice(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
          <input
            type="number"
            placeholder="Đến"
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={localMaxPrice ?? ""}
            onChange={(e) =>
              setLocalMaxPrice(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {pricePresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setLocalMinPrice(p.min);
                setLocalMaxPrice(p.max);
              }}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-blue-100 transition"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* SORT */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Sắp xếp</h3>
        <select
          value={localSort}
          onChange={(e) => setLocalSort(e.target.value as ProductSort)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* BUTTONS */}
      <div className="flex space-x-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-md transition cursor-pointer"
        >
          Áp dụng
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-md transition cursor-pointer"
        >
          Xóa bộ lọc
        </button>
      </div>
    </aside>
  );
};

export default ProductFilter;

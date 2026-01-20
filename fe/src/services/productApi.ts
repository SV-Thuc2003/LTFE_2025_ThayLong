import axios from 'axios';
import type {
  ProductHomeResponse,
  ProductListResponse,
  ProductDetailResponse,
  Page
} from '../types/product-response';
import type { ProductSort } from '../types/product-sort';

// const API_URL = 'http://localhost:8080/api';
const API_URL = import.meta.env.VITE_API_URL;

export interface HomeProductRequest {
  page?: number;
  size?: number;
  sort?: ProductSort;
}

export interface ProductListRequest {
  keyword?: string;
  categoryId?: number;
  categorySlug?: string;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  sort?: ProductSort;
}

/** HOME */
export const getHomeProducts = (data: HomeProductRequest) =>
  axios.post<Page<ProductHomeResponse>>(
    `${API_URL}/home/products`,
    data
  ).then(res => res.data);

/** PRODUCT LIST */
export const getProducts = (data: ProductListRequest) =>
  axios.post<Page<ProductListResponse>>(
    `${API_URL}/products`,
    data
  ).then(res => res.data);

/** PRODUCT DETAIL */
export const getProductDetail = (slug: string) =>
  axios.get<ProductDetailResponse>(
    `${API_URL}/products/${slug}`
  ).then(res => res.data);

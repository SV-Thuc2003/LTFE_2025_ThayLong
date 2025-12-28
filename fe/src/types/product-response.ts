export interface ProductHomeResponse {
  id: number;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  brandName: string;
}

export interface ProductListResponse {
  id: number;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  brandName: string;
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  images: string[];
  attributes: Record<string, string>;
}
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

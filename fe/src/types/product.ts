export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  isThumbnail: boolean;
}

export interface ProductDetail {
  id: number;
  attribute: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  productUrl?: string;

  brand?: Brand;
  category?: Category;

  images?: ProductImage[];
  details?: ProductDetail[];
}

/**
 * Response phân trang của Spring Boot
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page
}

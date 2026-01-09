// types/cart.ts
import type { ProductListResponse } from "./product-response.ts";

export interface CartItem {
  id: number;
  quantity: number;

  product: ProductListResponse;
}

export interface PromoCode {
  code: string;
  discount: number;
}
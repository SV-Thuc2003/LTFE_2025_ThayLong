// types/Cart.ts

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  slug: string;
  price: number;

  thumbnail: string;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discount: number;
}
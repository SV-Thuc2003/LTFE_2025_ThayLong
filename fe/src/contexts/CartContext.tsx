import {createContext} from "react";
import type { CartItem } from "../types/cart";


export interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

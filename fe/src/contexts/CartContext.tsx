import {createContext} from "react";
import type { CartItem } from "../types/Cart";


export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

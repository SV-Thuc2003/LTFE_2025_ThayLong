<<<<<<< ngovan
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import type { CartItem } from "../types/cart";


export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

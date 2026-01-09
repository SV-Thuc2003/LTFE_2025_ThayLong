import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import type { CartItem } from "../types/Cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    const res = await axios.get(`/api/cart/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCartItems(
        Array.isArray(res.data) ? res.data : res.data.cartItems ?? []
    );
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;

      const res = await axios.get(`/api/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(
          Array.isArray(res.data) ? res.data : res.data.cartItems ?? []
      );
    };

    loadCart();
  }, []);


  return (
      <CartContext.Provider
          value={{
            cartItems,
            refreshCart: fetchCart,

            addToCart: async (productId, quantity) => {
              const userId = localStorage.getItem("userId");
              const token = localStorage.getItem("token");
              if (!userId || !token) return;

              await axios.post(
                  `/api/cart/${userId}/add`,
                  { productId, quantity },
                  { headers: { Authorization: `Bearer ${token}` } }
              );
              fetchCart();
            },

            removeFromCart: async (productId) => {
              const userId = localStorage.getItem("userId");
              const token = localStorage.getItem("token");
              if (!userId || !token) return;

              await axios.delete(`/api/cart/${userId}/remove/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              fetchCart();
            },

            updateQuantity: async (productId, quantity) => {
              const userId = localStorage.getItem("userId");
              const token = localStorage.getItem("token");
              if (!userId || !token) return;

              await axios.put(
                  `/api/cart/${userId}/update`,
                  { productId, quantity },
                  { headers: { Authorization: `Bearer ${token}` } }
              );
              fetchCart();
            },
          }}
      >
        {children}
      </CartContext.Provider>
  );
};

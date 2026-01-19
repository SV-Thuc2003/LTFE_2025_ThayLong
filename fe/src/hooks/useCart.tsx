import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.tsx";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được dùng trong CartProvider");
  }
  return context;
};

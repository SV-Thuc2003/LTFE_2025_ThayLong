import React, { useMemo } from "react";
import CartSection from "./CartSection";
import CartSummary from "./CartSummary";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart.tsx";

const CartCheckOut: React.FC = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const total = subtotal;

  const handleRemoveItem = async (productId: number) => {
    await removeFromCart(productId);
  };

  const handleQuantityChange = async (
    productId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleApplyPromoCode = (code: string) => {
    console.log("Promo:", code);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="py-8 bg-white w-full">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 uppercase">
          Giỏ hàng ({cartItems.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartSection
              cartItems={cartItems}
              onRemoveItem={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
              onContinueShopping={handleContinueShopping}
            />
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              total={total}
              onApplyPromoCode={handleApplyPromoCode}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckOut;

import React from "react";
import ProductItem from "./ProductItem";
import Button from "../../components/Button";
import type { CartItem } from "../../types/cart";

interface CartSectionProps {
  cartItems: CartItem[];
  onRemoveItem: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
  onContinueShopping: () => void;
}

const CartSection: React.FC<CartSectionProps> = ({
  cartItems,
  onRemoveItem,
  onQuantityChange,
  onContinueShopping,
}) => {
  return (
    <div className="mb-8">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-2 border-b w-[124px]" />
            <th className="text-left py-2 border-b w-[800px]" />
            <th className="py-2 border-b w-[500px] uppercase font-bold text-center">
              Sản phẩm
            </th>
            <th className="py-2 border-b w-[250px] uppercase font-bold text-center">
              Giá
            </th>
            <th className="py-2 border-b w-[200px] uppercase font-bold text-center">
              Số lượng
            </th>
            <th className="py-2 border-b w-[250px] uppercase font-bold text-center">
              Tổng giá
            </th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <ProductItem
              key={item.productId}
              item={item}
              onRemove={onRemoveItem}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={6} className="py-4 border-b">
              <Button
                variant="outline"
                onClick={onContinueShopping}
                className="uppercase p-2"
              >
                ← Tiếp tục mua hàng
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartSection;

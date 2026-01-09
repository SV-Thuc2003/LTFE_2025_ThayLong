import React from 'react';
import ProductItem from './ProductItem';
import Button from '../../components/Button';
import type { CartItem } from '../../types/Cart';

interface CartSectionProps {
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
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
            <th className="text-left py-2 border-b border-[#a48c8ca8] w-[124px]"></th>
            <th className="text-left py-2 border-b border-[#a48c8ca8] w-[800px]"></th>
            <th className="py-2 border-b border-[#a48c8ca8] w-[500px] uppercase text-base font-bold text-center">
              {('Sản phẩm')}
            </th>
            <th className="py-2 border-b border-[#a48c8ca8] w-[250px] uppercase text-base font-bold text-center">
              {('Giá')}
            </th>
            <th className="py-2 border-b border-[#a48c8ca8] w-[200px] uppercase text-base font-bold text-center">
              {('Số lượng')}
            </th>
            <th className="py-2 border-b border-[#a48c8ca8] w-[250px] uppercase text-base font-bold text-center">
              {('Tổng giá')}
            </th>
          </tr>
          </thead>
          <tbody>
          {cartItems.map(item => (
              <ProductItem
                  key={`${item.id}-${item.product.id}`}
                  item={item}
                  onRemove={onRemoveItem}
                  onQuantityChange={onQuantityChange}
              />
          ))}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan={6} className="py-4 border-b border-[#a48c8ca8]">
              <div className="flex space-x-4">
                <Button
                    variant="outline"
                    onClick={onContinueShopping}
                    className="uppercase p-2"
                >
                  ← {('Tiếp tục mua hàng')}
                </Button>
              </div>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
  );
};

export default CartSection;

import React from 'react';
import type { CartItem } from '../../types/Cart';
import { Link } from 'react-router-dom';

interface ProductItemProps {
    item: CartItem;
    onRemove: (productId: number) => void;
    onQuantityChange: (productId: number, quantity: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onRemove, onQuantityChange }) => {

    const handleIncrement = () => onQuantityChange(item.id, item.quantity + 1);
    const handleDecrement = () => {
        if (item.quantity > 1) onQuantityChange(item.id, item.quantity - 1);
    };

    // ✅ LẤY SẢN PHẨM RA TỪ ITEM.PRODUCT
    const product = item.product;

    return (
        <tr className="border-b border-[#a48c8ca8] hover:bg-gray-50 transition duration-200">
            {/* Nút Xóa */}
            <td className="py-4 border-r border-[#a48c8ca8] w-[80px] text-center">
                <button
                    onClick={() => onRemove(item.id)}
                    className="w-8 h-8 rounded-full border border-gray-300 inline-flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 transition"
                >
                    ×
                </button>
            </td>

            {/* Ảnh Sản Phẩm */}
            <td className="py-4 border-r border-[#a48c8ca8] w-[120px] text-center">
                {/* 👇 Sửa: dùng product.slug và product.thumbnail */}
                <Link to={`/product/${product.slug}`}>
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-[90px] h-[90px] object-contain mx-auto border rounded bg-white"
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = "https://placehold.co/150x150?text=No+Image";
                        }}
                    />
                </Link>
            </td>

            {/* Tên Sản Phẩm */}
            <td className="py-4 border-r border-[#a48c8ca8] px-4">
                {/* 👇 Sửa: dùng product.slug và product.name */}
                <Link
                    to={`/product/${product.slug}`}
                    className="text-[#334862] text-lg font-medium hover:text-rose-600 transition block line-clamp-2"
                >
                    {product.name}
                </Link>
            </td>

            {/* Giá */}
            <td className="py-4 border-r border-[#a48c8ca8] w-[130px] text-center">
                <p className="text-base font-bold text-[#111111]">
                    {/* 👇 Sửa: dùng product.price */}
                    {product.price.toLocaleString()} ₫
                </p>
            </td>

            {/* Số lượng (Vẫn nằm ở item.quantity) */}
            <td className="py-4 border-r border-[#a48c8ca8] w-[140px] text-center">
                <div className="flex items-center justify-center">
                    <button onClick={handleDecrement} className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-l hover:bg-gray-200 flex items-center justify-center text-xl pb-1">-</button>
                    <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center bg-white">
                        <span className="text-base font-medium">{item.quantity}</span>
                    </div>
                    <button onClick={handleIncrement} className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-r hover:bg-gray-200 flex items-center justify-center text-xl pb-1">+</button>
                </div>
            </td>

            {/* Thành tiền */}
            <td className="py-4 w-[140px] text-center">
                <p className="text-base font-bold text-rose-600">
                    {/* 👇 Sửa: dùng product.price */}
                    {(product.price * item.quantity).toLocaleString()} ₫
                </p>
            </td>
        </tr>
    );
};

export default ProductItem;
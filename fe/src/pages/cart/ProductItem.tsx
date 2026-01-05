import React from 'react';
import type { CartItem } from '../../types/Cart';
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ProductItemProps {
    item: CartItem;
    onRemove: (productId: number) => void;
    onQuantityChange: (productId: number, quantity: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
                                                     item,
                                                     onRemove,
                                                     onQuantityChange
                                                 }) => {
    // const { t } = useTranslation(); // Tạm tắt nếu chưa config xong i18n để tránh lỗi

    const handleIncrement = () => {
        onQuantityChange(item.id, item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            onQuantityChange(item.id, item.quantity - 1);
        }
    };

    return (
        <tr className="border-b border-[#a48c8ca8]">
            {/* 1. Nút Xóa */}
            <td className="py-4 border-r border-[#a48c8ca8] w-[80px] text-center">
                <button
                    onClick={() => onRemove(item.id)}
                    className="w-8 h-8 rounded-full border border-gray-300 inline-flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition"
                >
                    ×
                </button>
            </td>

            {/* 2. Ảnh Sản Phẩm (NGUYÊN NHÂN GÂY GIẬT NẰM Ở ĐÂY) */}
            <td className="py-4 border-r border-[#a48c8ca8] w-[120px] text-center">
                <Link to={`/product/${item.slug}`}>
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-[90px] h-[90px] object-contain mx-auto border rounded bg-white"
                        // 👇 ĐOẠN CODE NÀY GIÚP HẾT GIẬT 👇
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null; // QUAN TRỌNG: Ngắt vòng lặp lỗi ngay lập tức
                            // Thay thế bằng ảnh giữ chỗ online (luôn sống)
                            target.src = "https://placehold.co/150x150?text=No+Image";
                        }}
                    />
                </Link>
            </td>

            {/* 3. Tên Sản Phẩm */}
            <td className="py-4 border-r border-[#a48c8ca8] px-4">
                <Link to={`/product/${item.slug}`} className="hover:text-rose-600 transition block">
                    <p className="text-[#334862] text-lg font-medium line-clamp-2">
                        {item.name || "Sản phẩm chưa có tên"}
                    </p>
                </Link>
            </td>

            {/* 4. Giá */}
            <td className="py-4 border-r border-[#a48c8ca8] w-[130px] text-center">
                <p className="text-base font-bold text-[#111111]">
                    {item.price.toLocaleString()} ₫
                </p>
            </td>

            {/* 5. Số lượng */}
            <td className="py-4 border-r border-[#a48c8ca8] w-[140px] text-center">
                <div className="flex items-center justify-center">
                    <button
                        onClick={handleDecrement}
                        className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-l hover:bg-gray-200 flex items-center justify-center text-xl pb-1"
                    >
                        -
                    </button>
                    <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center bg-white">
                        <span className="text-base font-medium">{item.quantity}</span>
                    </div>
                    <button
                        onClick={handleIncrement}
                        className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-r hover:bg-gray-200 flex items-center justify-center text-xl pb-1"
                    >
                        +
                    </button>
                </div>
            </td>

            {/* 6. Thành tiền */}
            <td className="py-4 w-[140px] text-center">
                <p className="text-base font-bold text-rose-600">
                    {(item.price * item.quantity).toLocaleString()} ₫
                </p>
            </td>
        </tr>
    );
};

export default ProductItem;
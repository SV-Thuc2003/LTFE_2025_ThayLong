import React from 'react';
import type { PersonalInfo, ShippingAddress } from '../../types/check-out';
import type { CartItem } from '../../types/cart';

interface OrderSummaryProps {
    personalInfo: PersonalInfo;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    products: CartItem[];
    subtotal: number;
    discount: number;
    shippingFee: number;
    onPlaceOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
                                                       products, subtotal, discount, shippingFee, onPlaceOrder, personalInfo, shippingAddress
                                                   }) => {
    const total = subtotal - discount + shippingFee;

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm w-full space-y-5">
            <h2 className="text-xl font-bold uppercase text-gray-800">Đơn hàng</h2>
            <div className="text-sm space-y-2 pb-4 border-b border-gray-200">
                <p><strong className="text-gray-700">Người nhận:</strong> {personalInfo.name || "..."}</p>
                <p><strong className="text-gray-700">SĐT:</strong> {personalInfo.phone || "..."}</p>
                <p>
                    <strong className="text-gray-700">Địa chỉ:</strong>{' '}
                    {[shippingAddress.address, shippingAddress.ward, shippingAddress.district, shippingAddress.city]
                        .filter(Boolean).join(', ') || "..."}
                </p>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {products.map((item: any, index) => {
                    const name = item.name || item.product?.name || "Sản phẩm";
                    const price = item.price ?? item.product?.price ?? 0;
                    const imageSrc = item.thumbnail || item.product?.images?.[0]?.imageUrl || "https://placehold.co/150x150";

                    return (
                        <div key={index} className="flex gap-4 border-b border-gray-100 pb-3 last:border-0">
                            <div className="w-16 h-16 flex-shrink-0 border rounded overflow-hidden bg-gray-50">
                                <img src={imageSrc} alt={name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 line-clamp-2">{name}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">x{item.quantity}</span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {(price * item.quantity).toLocaleString()} ₫
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-2 text-sm pt-2">
                <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString()} ₫</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Giảm giá</span>
                        <span>-{discount.toLocaleString()} ₫</span>
                    </div>
                )}
                <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span>{shippingFee.toLocaleString()} ₫</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-800">Tổng thanh toán</span>
                    <span className="font-bold text-xl text-rose-600">{total.toLocaleString()} ₫</span>
                </div>
            </div>

            <button
                onClick={onPlaceOrder}
                className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-800 transition active:scale-[0.98]"
            >
                ĐẶT HÀNG
            </button>
        </div>
    );
};
export default OrderSummary;
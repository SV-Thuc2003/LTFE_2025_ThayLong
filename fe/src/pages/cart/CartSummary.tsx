import React from 'react';
import Button from '../../components/Button';

interface CartSummaryProps {
    subtotal: number;
    total: number;
    onApplyPromoCode: (code: string) => void;
    onProceedToCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
                                                     subtotal,
                                                     total,
                                                     onProceedToCheckout
                                                 }) => {

    return (
        <div className="border border-[#a48c8ca8]">
            <div className="border-b border-[#a48c8ca8] p-4">
                <h2 className="text-xl font-bold uppercase">{('Tóm tắt đơn hàng')}</h2>
            </div>

            <div className="border-b border-[#a48c8ca8] p-4 flex justify-between items-center">
                <span className="text-xl">{('Tổng tiền hàng')}</span>
                <span className="text-xl font-bold">{subtotal.toLocaleString()} ₫</span>
            </div>

            <div className="border-b border-[#a48c8ca8] p-4 flex justify-between items-center">
                <span className="text-xl">{('Phí vận chuyển')}</span>
                <span className="text-xl font-bold">0 ₫</span>
            </div>

            <div className="border-b border-[#a48c8ca8] p-4 flex justify-between items-center">
                <span className="text-xl">{('Tổng thanh toán')}</span>
                <span className="text-xl font-bold">{total.toLocaleString()} ₫</span>
            </div>

            <div className="p-4">
                <Button
                    variant="primary"
                    onClick={onProceedToCheckout}
                    fullWidth
                    className="uppercase py-2 text-xl bg-red-600 hover:bg-rose-700"
                >
                    {('Thanh toán')}
                </Button>
            </div>
        </div>
    );
};

export default CartSummary;

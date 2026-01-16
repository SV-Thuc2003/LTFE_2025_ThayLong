import React from 'react';

interface PaymentMethodFormProps {
    paymentMethod: string;
    onPaymentMethodChange: (value: string) => void;
    onApplyDiscountCode: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ paymentMethod, onPaymentMethodChange }) => {
    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm space-y-4">
                <h2 className="text-2xl font-bold">Phương thức thanh toán</h2>
                <div className="flex flex-row items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={() => onPaymentMethodChange('cash')}
                            className="accent-rose-600 w-5 h-5"
                        />
                        <span>Tiền mặt (COD)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="vnpay"
                            checked={paymentMethod === 'vnpay'}
                            onChange={() => onPaymentMethodChange('vnpay')}
                            className="accent-rose-600 w-5 h-5"
                        />
                        <span>Ví VNPAY / QR Code</span>
                    </label>
                </div>
            </div>
        </div>
    );
};
export default PaymentMethodForm;
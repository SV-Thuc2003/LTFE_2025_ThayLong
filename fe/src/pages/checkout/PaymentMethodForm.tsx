import React from 'react';
import InputField from '../../components/common/InputField';

interface PaymentMethodFormProps {
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
  onApplyDiscountCode: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
                                                               paymentMethod,
                                                               onPaymentMethodChange
                                                             }) => {
  return (
      <div className="mb-6">
        <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm space-y-4">
          <h2 className="text-2xl font-bold">{('Phương thức thanh toán')}</h2>

          <div className="flex flex-row items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => onPaymentMethodChange('cash')}
                  className="accent-orange-500"
              />
              <span>{('Thanh toán khi nhận hàng')}</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                  type="radio"
                  name="paymentMethod"
                  value="vnpay"
                  checked={paymentMethod === 'vnpay'}
                  onChange={() => onPaymentMethodChange('vnpay')}
                  className="accent-orange-500"
              />
              <span>{('VN Pay')}</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={() => onPaymentMethodChange('creditCard')}
                  className="accent-orange-500"
              />
              <span>{('Thẻ tín dụng')}</span>
            </label>
          </div>

          {paymentMethod === 'creditCard' && (
              <div className="space-y-4 mt-4">
                <InputField label={('payment.cardName')} placeholder="Nguyễn Văn A" />
                <InputField label={('payment.cardNumber')} placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label={('payment.expiry')} placeholder="MM/YY" />
                  <InputField label={('payment.cvc')} placeholder="123" />
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default PaymentMethodForm;

import React from "react";
// import { useNavigate } from "react-router-dom"; // Không cần nếu Checkout đã handle navigate

interface QrPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrUrl: string;
    txnRef: string;
    userId: number;
    amount: number;
    payload: any;
    onConfirm: (payload: any) => Promise<any>;
}

const QrPayment: React.FC<QrPaymentModalProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      qrUrl,
                                                      txnRef,
                                                      // userId, // Có thể không cần dùng ở đây nếu payload đã có
                                                      amount,
                                                      payload,
                                                      onConfirm,
                                                  }) => {

    const handleConfirmPayment = async () => {
        try {
            // Gọi hàm onConfirm từ component cha (Checkout)
            // Hàm này sẽ chịu trách nhiệm gọi API tạo đơn hàng và chuyển trang
            await onConfirm(payload);
        } catch (err: any) {
            console.error("Lỗi xác nhận thanh toán:", err);
            alert("Xác nhận thất bại. Vui lòng thử lại!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm animate-fade-in-down">
                <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
                    Thanh toán qua QR
                </h2>

                <div className="flex justify-center mb-6 bg-gray-50 p-4 rounded border border-gray-200">
                    {/* Sử dụng dịch vụ tạo QR từ URL nếu qrUrl là link thanh toán */}
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`}
                        alt="QR code"
                        className="w-[180px] h-[180px] object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/200x200?text=QR+Error";
                        }}
                    />
                </div>

                <div className="space-y-2 mb-6 text-center">
                    <p className="text-sm text-gray-600">
                        Mã giao dịch: <span className="font-mono font-bold text-black">{txnRef}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Số tiền: <span className="font-bold text-red-600 text-lg">{amount.toLocaleString()} ₫</span>
                    </p>
                    <p className="text-xs text-gray-500 italic mt-2">
                        Vui lòng quét mã trên bằng ứng dụng ngân hàng hoặc ví điện tử.
                    </p>
                </div>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition font-medium text-sm"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={handleConfirmPayment}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-bold text-sm shadow-sm"
                    >
                        Đã thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QrPayment;
import React from "react";
import {Link} from "react-router-dom";

const OrderSuccess: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-md mt-2 animate-fade-in-up">
                    <img
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHhrYjV2aWQwenZncWU2b29pMnJpdG43cGg3Zjh1Mzl5MGx6OWVxdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PWehie2D58YxOqGrBt/giphy.gif"
                        alt="Success"
                        className="w-48 h-48 mx-auto mb-6 object-cover"
                    />
                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                        🎉 Đặt hàng thành công!
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Cảm ơn bạn đã mua sắm tại cửa hàng.<br/>
                        Đơn hàng của bạn đang được xử lý.
                    </p>
                    <div className="flex flex-col gap-4 w-full px-8">
                        <Link
                            to="/orders"
                            className="w-full py-3 px-4 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-semibold shadow-md"
                        >
                            Xem đơn hàng của tôi
                        </Link>
                        <Link
                            to="/products"
                            className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
                        >
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderSuccess;
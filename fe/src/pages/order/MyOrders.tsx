import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProductItem {
    name: string;
    imageUrl?: string;
    thumbnail?: string; // Backend trả về thumbnail
    quantity: number;
    price: number;
}

interface OrderResponse {
    id: number;
    totalInvoice: number;
    shippingFee: number;
    status: string;
    createdAt: string;
    products: ProductItem[];
}

const MyOrders: React.FC = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [filter, setFilter] = useState<string>("Tất cả");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) return;

        axios.get(`/api/orders/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setOrders(res.data))
            .catch((err) => console.error("Lỗi tải đơn hàng:", err));
    }, []);

    const filteredOrders =
        filter === "Tất cả" ? orders : orders.filter((o) => o.status === filter);

    const statusLabels: { [key: string]: string } = {
        "Tất cả": "Tất cả",
        "Pending": "Chờ xử lý",
        "Paid": "Đã thanh toán",
        "Shipped": "Đang giao",
        "Completed": "Hoàn thành",
        "Cancelled": "Đã hủy",
    };

    return (
        <div className="bg-white py-8">
            <div className="container mx-auto px-4">
                <div className="mb-4">
                    <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-2 text-sm font-medium text-gray-600">
                        {Object.keys(statusLabels).map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-2 pb-2 border-b-2 transition-colors ${
                                    filter === status ? "border-rose-500 text-black font-bold" : "border-transparent hover:text-rose-600"
                                }`}
                            >
                                {statusLabels[status]}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredOrders.map((order) => (
                    <div key={order.id} className="border border-gray-300 rounded-lg overflow-hidden mb-6 shadow-sm hover:shadow-md transition">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-700 flex justify-between flex-wrap gap-2">
                            <div>
                                <span className="font-bold text-black">Mã đơn: #{order.id}</span>
                                <span className="mx-2 text-gray-400">|</span>
                                <span>Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <span className="font-semibold text-rose-600 uppercase">
                    {statusLabels[order.status] || order.status}
                  </span>
                        </div>

                        {order.products.map((product, idx) => {
                            const imageSrc = product.thumbnail || product.imageUrl || "https://placehold.co/150x150?text=No+Image";

                            return (
                                <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b last:border-0 border-gray-100">
                                    <div className="flex items-center gap-4 w-full">
                                        <img
                                            src={imageSrc}
                                            alt={product.name}
                                            className="w-[80px] h-[80px] object-contain border border-gray-200 rounded bg-white"
                                            onError={(e) => { e.currentTarget.src = "https://placehold.co/150x150?text=Error"; }}
                                        />
                                        <div>
                                            <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">{product.name}</h3>
                                            <p className="text-xs text-gray-500 mt-1">Số lượng: x{product.quantity}</p>
                                            <p className="text-xs text-gray-500">Đơn giá: {product.price.toLocaleString()} ₫</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 min-w-[150px]">
                                        {["Completed", "Cancelled"].includes(order.status) && (
                                            <button className="text-sm px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition">Mua lại</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex justify-end px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-800">
                            <div className="text-right">
                                <span className="mr-2">Thành tiền:</span>
                                <span className="text-lg font-bold text-rose-600">
                      {(order.totalInvoice + order.shippingFee).toLocaleString()} ₫
                    </span>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">Không tìm thấy đơn hàng nào.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
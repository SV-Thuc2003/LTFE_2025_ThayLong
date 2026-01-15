import React, {useEffect, useMemo, useState} from "react";
import PersonalInfoForm from "../checkout/PersonalInfoForm";
import ShippingAddressForm from "../checkout/ShippingAddressForm";
import PaymentMethodForm from "../checkout/PaymentMethodForm";
import OrderSummary from "../checkout/OrderSummary";
import QrPayment from "../payment/QrPayment";

import type {
    CheckoutState,
    PersonalInfo,
    ShippingAddress,
} from "../../types/check-out";
import type {CartItem} from "../../types/cart";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCart} from "../../contexts/useCart.tsx";

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const {clearCart} = useCart(); // Lấy hàm clearCart

    const [checkoutState, setCheckoutState] = useState<CheckoutState>({
        personalInfo: {name: "", email: "", phone: ""},
        shippingAddress: {
            address: "",
            ward: "",
            wardCode: "",
            district: "",
            districtId: "",
            city: "",
            provinceId: ""
        },
        discountCode: "",
        paymentMethod: "cash", // Mặc định là tiền mặt
    });

    const [products, setProducts] = useState<CartItem[]>([]);
    const [shippingFee, setShippingFee] = useState<number>(0);

    // State cho QR Payment
    const [showQr, setShowQr] = useState(false);
    const [qrData, setQrData] = useState<any>(null);

    // Load giỏ hàng từ API
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            // Nếu chưa login, đẩy về login hoặc xử lý khác
            return;
        }

        axios.get(`/api/cart/${userId}`, {
            headers: {Authorization: `Bearer ${token}`},
            withCredentials: true,
        })
            .then(res => setProducts(res.data))
            .catch(err => console.error("Lỗi tải giỏ hàng:", err));
    }, []);

    // Tính toán tiền
    const subtotal = useMemo(() => {
        return products.reduce((sum, item: any) => {
            const price = item.price ?? item.product?.price ?? 0;
            return sum + (price * item.quantity);
        }, 0);
    }, [products]);

    const discount = checkoutState.discountCode ? 10000 : 0;

    // Handlers update State
    const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
        setCheckoutState(prev => ({
            ...prev,
            personalInfo: {...prev.personalInfo, [field]: value},
        }));
    };

    const handleShippingAddressChange = (field: keyof ShippingAddress, value: string) => {
        setCheckoutState(prev => ({
            ...prev,
            shippingAddress: {...prev.shippingAddress, [field]: value},
        }));
    };

    const handlePaymentMethodChange = (value: string) => {
        setCheckoutState(prev => ({...prev, paymentMethod: value}));
    };

    const handleApplyDiscountCode = () => {
        console.log("Áp dụng mã:", checkoutState.discountCode);
    };

    // Xử lý Đặt hàng
    const handlePlaceOrder = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            alert("Vui lòng đăng nhập để thanh toán");
            return;
        }

        // Validate cơ bản
        if (!checkoutState.personalInfo.name || !checkoutState.shippingAddress.address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng");
            return;
        }

        const formattedProducts = products.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        const amount = subtotal - discount + shippingFee;

        // Payload chung cho cả 2 trường hợp
        const orderPayload = {
            userId: parseInt(userId),
            personalInfo: checkoutState.personalInfo,
            shippingAddress: checkoutState.shippingAddress,
            products: formattedProducts,
            paymentMethod: checkoutState.paymentMethod,
            discountCode: checkoutState.discountCode,
            subtotal,
            shippingFee,
            discount,
            total: amount,
        };

        if (checkoutState.paymentMethod === "vnpay") {
            // --- THANH TOÁN QR ---
            try {
                const qrRes = await axios.get(`/api/payment/qr`, {
                    params: {amount},
                    withCredentials: true
                });

                const {qrUrl, txnRef} = qrRes.data;

                setQrData({
                    qrUrl,
                    txnRef,
                    userId: parseInt(userId),
                    amount,
                    // Truyền payload này vào để component con QrPayment dùng khi user xác nhận
                    payload: {...orderPayload, status: "PAID"}
                });

                setShowQr(true);
            } catch (err) {
                console.error("Lỗi tạo QR:", err);
                alert("Không thể tạo mã QR lúc này.");
            }
        } else {
            // --- THANH TOÁN THƯỜNG (COD) ---
            try {
                await axios.post("/api/orders", {...orderPayload, status: "Accepting"}, {
                    headers: {Authorization: `Bearer ${token}`}
                });

                clearCart(); // Xóa giỏ hàng client
                navigate("/order-success"); // Chuyển trang
            } catch (err) {
                console.error("Lỗi đặt hàng:", err);
                alert("Đặt hàng thất bại. Vui lòng thử lại.");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8 text-center uppercase">Thanh toán</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <PersonalInfoForm
                                personalInfo={checkoutState.personalInfo}
                                onPersonalInfoChange={handlePersonalInfoChange}
                            />
                            <ShippingAddressForm
                                shippingAddress={checkoutState.shippingAddress}
                                onShippingAddressChange={handleShippingAddressChange}
                                onShippingFeeChange={setShippingFee}
                            />
                            <PaymentMethodForm
                                paymentMethod={checkoutState.paymentMethod}
                                onPaymentMethodChange={handlePaymentMethodChange}
                                onApplyDiscountCode={handleApplyDiscountCode}
                            />
                        </div>

                        {/* Cột phải: Tóm tắt đơn hàng */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4">
                                <OrderSummary
                                    personalInfo={checkoutState.personalInfo}
                                    shippingAddress={checkoutState.shippingAddress}
                                    discountCode={checkoutState.discountCode}
                                    paymentMethod={checkoutState.paymentMethod}
                                    products={products ?? []}
                                    subtotal={subtotal}
                                    discount={discount}
                                    shippingFee={shippingFee}
                                    onPlaceOrder={handlePlaceOrder}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Đã xóa Footer để tránh lặp với Layout */}

            {qrData && (
                <QrPayment
                    isOpen={showQr}
                    onClose={() => setShowQr(false)}
                    qrUrl={qrData.qrUrl}
                    txnRef={qrData.txnRef}
                    userId={qrData.userId}
                    amount={qrData.amount}
                    payload={qrData.payload}
                    onConfirm={async (payload) => {
                        // Khi user xác nhận đã chuyển khoản
                        try {
                            const res = await axios.post("/api/orders", payload, {
                                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                                withCredentials: true
                            });

                            clearCart(); // Xóa giỏ hàng
                            navigate("/order-success"); // Chuyển trang
                            return res.data;
                        } catch (e) {
                            console.error("Lỗi xác nhận đơn hàng QR:", e);
                            throw e;
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Checkout;

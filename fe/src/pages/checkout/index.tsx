import React, { useEffect, useState, useMemo, useCallback } from "react";
import PersonalInfoForm from "../checkout/PersonalInfoForm";
import ShippingAddressForm from "../checkout/ShippingAddressForm";
import PaymentMethodForm from "../checkout/PaymentMethodForm";
import OrderSummary from "../checkout/OrderSummary";
import QrPayment from "../payment/QrPayment";

import type { CheckoutState, PersonalInfo, ShippingAddress } from "../../types/check-out";
import type { CartItem } from "../../types/cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart.tsx";

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [checkoutState, setCheckoutState] = useState<CheckoutState>({
        personalInfo: { name: "", email: "", phone: "" },
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
        paymentMethod: "cash",
    });

    const [products, setProducts] = useState<CartItem[]>([]);
    const [shippingFee, setShippingFee] = useState<number>(0);
    const [showQr, setShowQr] = useState(false);
    const [qrData, setQrData] = useState<any>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId || !token) return;

        axios.get(`/cart/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
            .then(res => setProducts(res.data))
            .catch(err => console.error("Lỗi tải giỏ hàng:", err));
    }, []);

    const subtotal = useMemo(() => {
        return products.reduce((sum, item: any) => {
            const price = item.price ?? item.product?.price ?? 0;
            return sum + (price * item.quantity);
        }, 0);
    }, [products]);

    const discount = 0;

    const handlePersonalInfoChange = useCallback((field: keyof PersonalInfo, value: string) => {
        setCheckoutState(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value },
        }));
    }, []);

    const handleShippingAddressChange = useCallback((field: keyof ShippingAddress, value: string) => {
        setCheckoutState(prev => {
            if (prev.shippingAddress[field] === value) return prev;
            return {
                ...prev,
                shippingAddress: { ...prev.shippingAddress, [field]: value },
            };
        });
    }, []);

    const handlePaymentMethodChange = useCallback((value: string) => {
        setCheckoutState(prev => ({ ...prev, paymentMethod: value }));
    }, []);

    const handlePlaceOrder = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            alert("Vui lòng đăng nhập để thanh toán");
            return;
        }

        const { address, provinceId, districtId, wardCode } = checkoutState.shippingAddress;
        const { name, phone } = checkoutState.personalInfo;

        if (!name || !phone) {
            alert("Vui lòng điền tên và số điện thoại!");
            return;
        }
        if (!address || !provinceId || !districtId || !wardCode) {
            alert("Vui lòng chọn đầy đủ địa chỉ giao hàng!");
            return;
        }

        const formattedProducts = products.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        const amount = subtotal - discount + shippingFee;

        const orderPayload = {
            userId: parseInt(userId),
            personalInfo: checkoutState.personalInfo,
            shippingAddress: {
                ...checkoutState.shippingAddress,
                provinceId: String(provinceId),
                districtId: String(districtId),
                wardCode: String(wardCode)
            },
            products: formattedProducts,
            paymentMethod: checkoutState.paymentMethod,
            discountCode: "0",
            subtotal,
            shippingFee,
            discount: 0,
            total: amount,

            status: "Pending"
        };

        console.log("SENDING PAYLOAD:", JSON.stringify(orderPayload, null, 2));

        if (checkoutState.paymentMethod === "vnpay") {
            try {
                const qrRes = await axios.get(`/payment/qr`, {
                    params: { amount },
                    withCredentials: true
                });
                setQrData({
                    qrUrl: qrRes.data.qrUrl,
                    txnRef: qrRes.data.txnRef,
                    userId: parseInt(userId),
                    amount,
                    payload: { ...orderPayload, status: "Paid" } // QR thì status là Paid
                });
                setShowQr(true);
            } catch (err) {
                alert("Lỗi tạo mã QR. Vui lòng thử lại.");
            }
        } else {
            try {
                await axios.post("/orders", orderPayload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                clearCart();
                navigate("/order-success");
            } catch (err: any) {
                console.error("Lỗi đặt hàng:", err);
                const serverMessage = err.response?.data?.message || err.response?.data || "Lỗi hệ thống";

                if (String(serverMessage).includes("OrderStatus")) {
                    alert(`Lỗi: Backend không tìm thấy trạng thái "Pending"`);
                } else {
                    alert(`Đặt hàng thất bại: ${serverMessage}`);
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-grow container mx-auto px-4 py-8">
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
                            onApplyDiscountCode={() => {}}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <OrderSummary
                                personalInfo={checkoutState.personalInfo}
                                shippingAddress={checkoutState.shippingAddress}
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
            </main>
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
                        await axios.post("/orders", payload, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                            withCredentials: true
                        });
                        clearCart();
                        navigate("/order-success");
                    }}
                />
            )}
        </div>
    );
};

export default Checkout;
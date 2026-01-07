import React, { useState, useEffect, useMemo } from "react";
import CartSection from "./CartSection";
import CartSummary from "./CartSummary";
import type { CartItem } from "../../types/Cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartCheckOut: React.FC = () => {
    const navigate = useNavigate();

    // ✅ PHẦN 1: KHỞI TẠO DỮ LIỆU MẪU
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            console.log("Guest Mode: Dùng dữ liệu mẫu Nested");
            return [
                {
                    id: 1,
                    quantity: 2,
                    productId: 1,
                    product: {
                        id: 1,
                        name: "Sữa Hoàng Gia Úc Royal Ausnz Premium Gold 1 (800g)",
                        slug: "sua-hoang-gia-uc-royal-ausnz-premium-gold-1",
                        price: 880000,
                        thumbnail: "https://bibomart.net/images/product/600/238478.jpg",
                        brandName: "Royal Ausnz",
                        rating: 5,
                        sold: 100,
                        discount: 0
                    }
                },
                {
                    id: 2,
                    quantity: 1,
                    productId: 2,
                    product: {
                        id: 2,
                        name: "Sữa Bột Aptamil Profutura Úc Số 1 (900g)",
                        slug: "sua-bot-aptamil-profutura-uc-so-1",
                        price: 950000,
                        thumbnail: "https://cdn.concung.com/2022/05/57608-91219-large_mobile/sua-aptamil-profutura-uc-so-1-900g.jpg",
                        brandName: "Aptamil",
                        rating: 4.5,
                        sold: 50,
                        discount: 0
                    }
                }
            ];
        }
        return [];
    });

    // ✅ PHẦN 2: GỌI API
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) return;

        const fetchCart = async () => {
            try {
                const res = await axios.get(`/api/cart/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                const rawData = Array.isArray(res.data) ? res.data : res.data.cartItems || [];

                // 👇 Dòng này fix lỗi ESLint "Unexpected any"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mappedData: CartItem[] = rawData.map((item: any) => ({
                    id: item.id,
                    quantity: item.quantity || 1,
                    productId: item.productId || item.product?.id,

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    product: {
                        id: item.productId || item.product?.id,
                        name: item.productName || item.name || item.product?.name || "Sản phẩm",
                        slug: item.slug || item.product?.slug || "#",
                        thumbnail: item.thumbnail || item.imageUrl || item.product?.thumbnail || "/assets/images/default.png",
                        price: item.price || item.product?.price || 0,
                        brandName: item.brandName || "",
                        rating: 0,
                        sold: 0,
                        discount: 0
                    }
                }));

                setCartItems(mappedData);
            } catch (error) {
                console.error("Lỗi lấy giỏ hàng:", error);
            }
        };

        fetchCart();
    }, []);

    // ✅ PHẦN 3: TÍNH TỔNG
    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const price = item.product?.price || 0;
            return sum + (price * item.quantity);
        }, 0);
    }, [cartItems]);

    const total = subtotal;

    // --- LOGIC GIỮ NGUYÊN ---
    const handleRemoveItem = async (cartItemId: number) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));

        if (userId && token) {
            try {
                await axios.delete(`/api/cart/${userId}/remove/${cartItemId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
            } catch (e) { console.error(e); }
        }
    };

    const handleQuantityChange = (cartId: number, newQuantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => item.id === cartId ? { ...item, quantity: newQuantity } : item)
        );
    };

    const handleUpdateCart = async () => {
        console.log("Updating cart...", cartItems);
        alert("Đã cập nhật giỏ hàng!");
    };

    const handleContinueShopping = () => { navigate("/products"); };
    const handleApplyPromoCode = (code: string) => { console.log(code); };
    const handleProceedToCheckout = () => { navigate("/checkout"); };

    return (
        <div className="py-8 bg-white w-full">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 uppercase">
                    Giỏ hàng ({cartItems.length})
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <CartSection
                            cartItems={cartItems}
                            onRemoveItem={handleRemoveItem}
                            onQuantityChange={handleQuantityChange}
                            onUpdateCart={handleUpdateCart}
                            onContinueShopping={handleContinueShopping}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <CartSummary
                            subtotal={subtotal}
                            total={total}
                            onApplyPromoCode={handleApplyPromoCode}
                            onProceedToCheckout={handleProceedToCheckout}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCheckOut;
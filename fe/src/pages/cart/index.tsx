import React, { useState, useEffect, useMemo } from "react";
// Đã xóa Header/Footer thừa để tránh bị trùng
import CartSection from "./CartSection";
import CartSummary from "./CartSummary";
import type { CartItem } from "../../types/Cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartCheckOut: React.FC = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            console.log("Guest Mode: Dùng dữ liệu mẫu từ milk_shop.sql");
            return [
                {
                    id: 1, // ID giả lập của item trong giỏ
                    productId: 1, // ID thật trong bảng products (Royal Ausnz)
                    name: "Sữa Hoàng Gia Úc Royal Ausnz Premium Gold 1 (800g)",
                    slug: "sua-hoang-gia-uc-royal-ausnz-premium-gold-1",
                    price: 880000, // Giá lấy từ SQL
                    // Link ảnh mẫu thực tế (bạn có thể thay bằng link localhost của bạn)
                    thumbnail: "https://bibomart.net/images/product/600/238478.jpg",
                    quantity: 1,
                },
                {
                    id: 2,
                    productId: 2, // ID thật trong bảng products (Aptamil)
                    name: "Sữa Bột Aptamil Profutura Úc Số 1 (900g)",
                    slug: "sua-bot-aptamil-profutura-uc-so-1",
                    price: 950000,
                    thumbnail: "https://cdn.concung.com/2022/05/57608-91219-large_mobile/sua-aptamil-profutura-uc-so-1-900g.jpg",
                    quantity: 2,
                },
                {
                    id: 3,
                    productId: 5, // ID thật (Meiji)
                    name: "Sữa Bột Meiji Infant Formula (800g)",
                    slug: "sua-bot-meiji-infant-formula-800g",
                    price: 555000,
                    thumbnail: "https://cdn.concung.com/2022/07/58421-93883-large_mobile/sua-meiji-so-0-800g-noi-dia-mau-moi.jpg",
                    quantity: 1,
                }
            ];
        }
        return [];
    });

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

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mappedData: CartItem[] = rawData.map((item: any) => ({
                    id: item.id,
                    productId: item.productId,
                    name: item.name || item.productName || "Sản phẩm",
                    slug: item.slug || "#",
                    thumbnail: item.thumbnail || item.imageUrl || "/assets/images/default.png",
                    price: item.price || 0,
                    quantity: item.quantity || 1
                }));

                setCartItems(mappedData);
            } catch (error) {
                console.error("Lỗi lấy giỏ hàng:", error);
            }
        };

        fetchCart();
    }, []);

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    const total = subtotal;

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
        // Logic gọi API update (giữ nguyên)
    };

    const handleContinueShopping = () => { navigate("/products"); };
    const handleApplyPromoCode = (code: string) => { console.log(code); };
    const handleProceedToCheckout = () => { navigate("/checkout"); };

    return (
        <div className="py-8 bg-white w-full">
            <div className="container mx-auto px-4">
                {/* Tiêu đề trang (Optional) */}
                <h1 className="text-2xl font-bold mb-6 text-gray-800 uppercase">Giỏ hàng ({cartItems.length})</h1>

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
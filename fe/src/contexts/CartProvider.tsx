import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";
import {CartContext} from "./CartContext";
import type {CartItem} from "../types/cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                          children,
                                                                      }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const mapToCartItem = (item: any): CartItem => {
        return {
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,

            product: {
                id: item.productId,
                name: item.name,
                price: item.price,
                slug: item.slug || "#",

                images: item.thumbnail
                    ? [{id: 0, imageUrl: item.thumbnail, isThumbnail: true}]
                    : [],

                brand: undefined,
                category: undefined,
                details: []
            }
        };
    };

    const fetchCart = useCallback(async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId || !token) {
            setCartItems([]);
            return;
        }

        try {
            const res = await axios.get(`/api/cart/${userId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            const rawItems = Array.isArray(res.data)
                ? res.data
                : res.data.cartItems ?? [];

            setCartItems(rawItems.map(mapToCartItem));
        } catch (err) {
            console.error("Fetch cart error:", err);
        }
    }, []);

    useEffect(() => {
    }, [fetchCart]);
    const clearCart = () => {
        setCartItems([]); // Xóa state
        // localStorage.removeItem('cart_items');
    };
    return (
        <CartContext.Provider
            value={{
                cartItems,

                cartCount: cartItems.reduce((sum, i) => sum + i.quantity, 0),

                refreshCart: fetchCart,

                addToCart: async (productId, quantity) => {
                    const userId = localStorage.getItem("userId");
                    const token = localStorage.getItem("token");
                    if (!userId || !token) {
                        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
                        return;
                    }

                    await axios.post(
                        `/api/cart/${userId}/add`,
                        {productId, quantity},
                        {headers: {Authorization: `Bearer ${token}`}}
                    );

                    fetchCart();
                },

                removeFromCart: async (cartItemId) => {
                    const token = localStorage.getItem("token");
                    const userId = localStorage.getItem("userId");
                    if (!token || !userId) {
                        alert("Lỗi xác thực người dùng");
                        return;
                    }

                    try {
                        await axios.delete(`/api/cart/${userId}/remove/${cartItemId}`, {
                            headers: {Authorization: `Bearer ${token}`},
                        });

                        fetchCart();
                    } catch (error) {
                        console.error("Lỗi ", error);
                    }
                },

                updateQuantity: async (productId, quantity) => {
                    const token = localStorage.getItem("token");
                    const userId = localStorage.getItem("userId");

                    if (!token || !userId) {
                        console.error("Thiếu token hoặc userId");
                        return;
                    }
                    const currentItem = cartItems.find(item => item.productId === productId);

                    if (!currentItem) {
                        console.error("Không tìm thấy item này trong state giỏ hàng");
                        return;
                    }

                    try {
                        console.log(`🔄 Đang update CartItem ID: ${currentItem.id} - Qty: ${quantity}`);
                        await axios.put(
                            `/api/cart/${userId}/update`,
                            [
                                {
                                    id: currentItem.id,
                                    quantity: Number(quantity)
                                }
                            ],
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            }
                        );
                        fetchCart();

                    } catch (error: any) {
                        console.error("❌ Lỗi cập nhật:", error);
                        if (error.response?.status === 401) {
                            alert("Lỗi xác thực (401). Vui lòng đăng nhập lại.");
                        }
                    }
                },
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

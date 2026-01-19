import React, { useEffect, useState } from "react";
import Footer from "../../components/layout/footer/footer";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../contexts/useCart";
import { useFavorites } from "../../hooks/useFavorite";
import axios from "../../Service/axios";
import { Link } from "react-router-dom";

interface FavoriteResponse {
  userId: number;
  productId: number;
  productName: string;
  productImage: string;
  productPrice: number;
  productSlug: string;
}

const FavoriteList: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([]);
  const { addToCart } = useCart();
  const { toggleFavorite } = useFavorites();
  const [loadingLocal, setLoadingLocal] = useState(true);

  //Lấy userId từ localStorage
  const getUserId = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.id;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const userId = getUserId();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        setLoadingLocal(false);
        return;
      }

      try {
        const res = await axios.get(`/favorites/${userId}`);
        if (Array.isArray(res.data)) {
          setFavorites(res.data);
        } else {
          setFavorites([]);
        }
      } catch (err) {
        console.error("Lỗi tải favorites:", err);
      } finally {
        setLoadingLocal(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleRemoveFavorite = async (productId: number) => {
    await toggleFavorite(productId);
    // Cập nhật state để UI biến mất ngay lập tức
    setFavorites((prev) => prev.filter((item) => item.productId !== productId));
  };

  if (!userId) {
    return (
        <div className="text-center mt-10">
          <h2 className="text-xl">Vui lòng đăng nhập để xem danh sách yêu thích</h2>
        </div>
    );
  }

  if (loadingLocal) return <div className="text-center mt-6">Đang tải...</div>;

  return (
      <>
        <main className="min-h-[90vh] px-4 py-6 flex justify-center">
          <div className="w-full max-w-[1440px] px-6 py-6 shadow-md rounded-[40px] bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Sản phẩm yêu thích</h2>

            {favorites.length === 0 ? (
                <div className="text-center mt-6 text-gray-500">
                  Bạn chưa có sản phẩm yêu thích nào.
                </div>
            ) : (
                <div className="flex flex-col space-y-6">
                  {favorites.map((fav) => (
                      <div
                          key={fav.productId}
                          className="w-full flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-gray-100 shadow hover:shadow-md rounded-xl transition duration-200"
                      >
                        {/* Ảnh sản phẩm */}
                        <img
                            src={fav.productImage || "/placeholder.jpg"}
                            alt={fav.productName}
                            className="w-32 h-32 object-cover rounded-md"
                        />

                        <div className="flex flex-col flex-grow gap-2 text-center sm:text-left">
                          <h3 className="font-semibold text-lg">{fav.productName}</h3>
                          <p className="text-red-600 font-bold text-base">
                            {fav.productPrice?.toLocaleString("vi-VN")}₫
                          </p>

                          <div className="flex gap-3 mt-2 justify-center sm:justify-start">
                            <button
                                onClick={() => addToCart(fav.productId, 1)}
                                className="flex items-center px-3 py-1 bg-[#fd7e14] text-white rounded-md hover:bg-[#e66f10] text-sm transition"
                            >
                              <FiShoppingCart className="mr-1" />
                              Thêm vào giỏ
                            </button>

                            {/* Nút Xóa khỏi yêu thích */}
                            <button
                                onClick={() => handleRemoveFavorite(fav.productId)}
                                className="flex items-center text-red-500 hover:text-red-700 transition border border-red-200 px-3 py-1 rounded-md"
                                title="Xóa khỏi yêu thích"
                            >
                              <FaHeart className="mr-2" /> Bỏ thích
                            </button>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </main>
        <Footer />
      </>
  );
};

export default FavoriteList;
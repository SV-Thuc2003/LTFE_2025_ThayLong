import React from 'react';
import FavoriteList from './FavoriteList';

const FavoriteProductsPage: React.FC = () => {
  // Lấy userId từ localStorage
  const userIdString = localStorage.getItem('userId');
  const userId = userIdString ? parseInt(userIdString, 10) : null;

  // Kiểm tra trạng thái đăng nhập
  if (!userId) {
    return (
        <div className="text-center mt-10 p-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">
            Vui lòng đăng nhập để xem danh sách sản phẩm yêu thích của bạn.
          </p>
        </div>
    );
  }

  // Render danh sách yêu thích
  return <FavoriteList userId={userId} />;
};

export default FavoriteProductsPage;
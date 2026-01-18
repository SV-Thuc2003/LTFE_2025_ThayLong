import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
const HeaderUser: React.FC = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // quay về trang home sau logout
    setIsOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <Link
        to="/login"
        className="text-sm font-semibold text-white bg-rose-600 px-4 py-2 rounded-full hover:bg-rose-700 transition"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-semibold text-white bg-rose-600 px-4 py-2 rounded-full hover:bg-rose-700 transition"
      >
        <FaUserCircle className="mr-2" />
        {username || "Tài khoản"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
          {/* Profile */}
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Hồ sơ
          </Link>

          {/* Orders */}
          <Link
            to="/orders"
            className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Đơn hàng
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition font-medium"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};
export default HeaderUser;

import React from "react";
import { FaUserCircle } from "react-icons/fa";

const HeaderUser: React.FC = () => {
  const isLoggedIn = false; // MOCK
  const username = "Guest";

  if (!isLoggedIn) {
    return (
      <button className="text-sm font-semibold text-white bg-rose-600 px-4 py-2 rounded-full hover:bg-rose-700 transition">
        Đăng nhập
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <FaUserCircle className="w-6 h-6 text-blue-500" />
      <span>{username}</span>
    </div>
  );
};

export default HeaderUser;

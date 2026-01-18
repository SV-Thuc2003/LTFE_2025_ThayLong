import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { useAuth } from "../../../hooks/useAuth";

const HeaderUser: React.FC = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-semibold text-white bg-rose-600 px-4 py-2 rounded-full hover:bg-rose-700 transition focus:outline-none"
      >
        <FaUserCircle className="mr-2 text-lg" />
        <span className="max-w-[100px] truncate">
          {username || "Tài khoản"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md overflow-hidden z-50 border border-gray-100">
          <div className="absolute top-0 right-4 -mt-1 w-2 h-2 bg-white transform rotate-45 border-l border-t border-gray-100"></div>

          <div className="py-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Hồ sơ cá nhân
            </Link>

            <Link
              to="/orders"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Đơn hàng của tôi
            </Link>

            <div className="border-t border-gray-100 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderUser;
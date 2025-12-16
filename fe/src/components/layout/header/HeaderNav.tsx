import React from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderNav: React.FC = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { path: "/", label: "Trang chủ" },
    { path: "/products", label: "Sản phẩm" },
    { path: "/brands", label: "Thương hiệu" },
    { path: "/promotions", label: "Khuyến mãi" },
    { path: "/contact", label: "Liên hệ" },
  ];

  return (
    <nav className="flex items-center space-x-8">
      {navLinks.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-base font-semibold transition ${
            pathname === item.path
              ? "text-rose-600 border-b-2 border-rose-600 pb-1"
              : "text-gray-700 hover:text-rose-600"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNav;

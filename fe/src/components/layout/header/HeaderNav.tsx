import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const HeaderNav: React.FC = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { path: "/", label: "Trang chủ" },
    { path: "/products", label: "Sản phẩm" },
    {
      path: "/categories",
      label: "Danh mục",
      dropdown: [
        { path: "products/sua-bot-cho-be", label: "Sữa bột cho bé" },
        { path: "products/sua-bot-cho-nguoi-lon", label: "Sữa bột cho người lớn" },
      ],
    },
    { path: "/promotions", label: "Khuyến mãi" },
    { path: "/contact", label: "Liên hệ" },
  ];

  return (
    <nav className="flex items-center space-x-10 font-sans relative">
      {navLinks.map((item) => (
        <div key={item.path} className="relative group">
          {/* Menu chính */}
          <Link
            to={item.path}
            className={`flex items-center space-x-1 text-base font-semibold transition ${
              pathname === item.path ||
              (item.dropdown &&
                item.dropdown.some((d) => pathname.startsWith(d.path)))
                ? "text-rose-600 border-b-2 border-rose-600 pb-1"
                : "text-gray-700 hover:text-rose-600"
            }`}
          >
            <span>{item.label}</span>
            {item.dropdown && <ChevronDownIcon className="w-4 h-4" />}
          </Link>

          {/* Dropdown */}
          {item.dropdown && (
            <div
              className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg 
                         opacity-0 invisible group-hover:visible group-hover:opacity-100
                         transform -translate-y-2 group-hover:translate-y-0
                         transition-all duration-200 z-50"
            >
              {item.dropdown.map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className={`block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition
                    ${
                      pathname === sub.path
                        ? "bg-rose-50 text-rose-600 font-semibold"
                        : ""
                    }`}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderNav;

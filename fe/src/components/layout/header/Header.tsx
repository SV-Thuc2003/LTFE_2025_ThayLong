import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import HeaderUser from "./HeaderUser";
import HeaderCart from "./HeaderCart";
import HeaderFavorite from "./HeaderFavorite";
// import logo from "../../../assets/logo.png";

const Header: React.FC = () => {
  return (
    <header className="bg-white sticky top-0 z-50">
      <HeaderTop />

      <div className="container mx-auto px-4 py-4 flex items-center justify-between rounded-xl shadow-sm border border-gray-100">
        {/* Logo */}
        <div className="flex items-center">
          {/* <img src={logo} alt="Milk Store" className="w-[72px] h-[58px]" /> */}
          <span className="ml-2 text-2xl font-extrabold text-rose-600">
            Milk Powder Store
          </span>
        </div>

        {/* Menu */}
        <HeaderNav />

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <HeaderUser />
          <HeaderSearch />
          <HeaderFavorite />
          <HeaderCart />
        </div>
      </div>
    </header>
  );
};

export default Header;

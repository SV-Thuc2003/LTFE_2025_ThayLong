import React from "react";
import {Link} from "react-router-dom";
import {CiShoppingCart} from "react-icons/ci";

const HeaderCart: React.FC = () => {
    const cartCount = 0; // MOCK

    return (
        <Link to="/cart" className="relative cursor-pointer block">
            <CiShoppingCart className="w-7 h-7 text-gray-700 hover:text-rose-600 transition"/>
            <span
                className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
            </span>
        </Link>
    );
};

export default HeaderCart;

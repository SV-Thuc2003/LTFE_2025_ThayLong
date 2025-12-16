import React from "react";
import { CiHeart } from "react-icons/ci";

const HeaderFavorite: React.FC = () => {
  const favoriteCount = 0; // MOCK

  return (
    <div className="relative cursor-pointer">
      <CiHeart className="w-7 h-7" />
      <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
        {favoriteCount}
      </span>
    </div>
  );
};

export default HeaderFavorite;

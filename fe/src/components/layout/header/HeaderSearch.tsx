import React, { useState } from "react";
import { IoSearchCircle } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";

const HeaderSearch: React.FC = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="relative">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm sữa..."
        className="bg-gray-100 rounded-full w-[280px] h-10 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-rose-300"
      />

      <CiMicrophoneOn
        className="absolute right-9 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-rose-500 cursor-pointer"
        title="Tìm kiếm bằng giọng nói"
      />

      <IoSearchCircle
       className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 text-rose-600 cursor-pointer"
      />
    </div>
  );
};

export default HeaderSearch;

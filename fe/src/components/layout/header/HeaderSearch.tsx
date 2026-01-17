import React, { useState } from "react";
import { IoSearchCircle } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSpeechSearch } from "../../../hooks/useSpeechSearch";


const HeaderSearch: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const { isListening, startListening, stopListening } = useSpeechSearch("vi-VN");

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="relative">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Tìm kiếm sữa..."
        className="bg-gray-100 rounded-full w-[280px] h-10 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-rose-300"
      />

      <CiMicrophoneOn
        onClick={() =>
          isListening
            ? stopListening()
            : startListening((text) => {
                setKeyword(text);
                navigate(`/search?keyword=${encodeURIComponent(text)}`);
              })
        }
        className={`absolute right-9 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer
          ${
            isListening
              ? "text-rose-500 animate-pulse"
              : "text-gray-400 hover:text-rose-500"
          }
        `}
        title="Tìm kiếm bằng giọng nói"
      />

      <IoSearchCircle 
      onClick={handleSearch}
       className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 text-rose-600 cursor-pointer"
      />
    </div>
  );
};

export default HeaderSearch;

import React from "react";
import { HiOutlinePhone } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const HeaderTop: React.FC = () => {
  return (
    <div className="bg-rose-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center text-gray-700 text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <HiOutlinePhone className="w-4 h-4 text-rose-600" />
            <span className="ml-2">Hotline: 0987 123 456</span>
          </div>

          <div className="flex items-center">
            <MdOutlineEmail className="w-4 h-4 text-rose-600" />
            <span className="ml-2">support@milkstore.vn</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <CiLocationOn className="w-4 h-4 text-rose-600" />
          <span>Hồ Chí Minh</span>

          <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white">
            <option>VI</option>
            <option>EN</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default HeaderTop;

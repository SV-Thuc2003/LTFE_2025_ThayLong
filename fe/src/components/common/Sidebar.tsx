import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { IconType } from "react-icons";
import { IoHomeOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

interface SidebarItem {
  icon: IconType;
  label: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();

  const sidebarItems: SidebarItem[] = [
    {
      icon: IoHomeOutline,
      label: 'Thông tin cá nhân',
      path: '/profile'
    },
    {
      icon: FaClipboardList,
      label: 'Đơn hàng của tôi',
      path: '/profile/orders'
    },
    {
      icon: MdSecurity,
      label: 'Bảo mật tài khoản',
      path: '/profile/security'
    },
    {
      icon: AiOutlineHeart,
      label: 'Danh sách yêu thích',
      path: '/profile/favorites'
    },
    {
      icon: FiLogOut,
      label: 'Đăng xuất',
      path: '/logout'
    }
  ];

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.getAttribute('href') === '/logout') {
      e.preventDefault();
      console.log('Đang đăng xuất...');
    }
  };

  return (
      <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
              <Link
                  key={index}
                  to={item.path}
                  onClick={handleLogout}
                  className={`flex items-center p-3 mb-3 rounded-md transition-colors ${
                      isActive ? 'bg-[#fff7ef]' : 'hover:bg-gray-50'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#fd7e14]' : 'text-[#313f53]'}`} />
                <span
                    className={`ml-4 text-base font-medium ${
                        isActive ? 'text-[#fd7e14]' : 'text-[#313f53]'
                    }`}
                >
                  {item.label}
                </span>
              </Link>
          );
        })}
      </div>
  );
};

export default Sidebar;
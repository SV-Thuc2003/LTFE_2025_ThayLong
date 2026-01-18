import React from 'react';
import { Link } from 'react-router-dom';
// import logo from "../../../assets/logo.png";
import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
// import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {

  return (
    <footer className="bg-[#f8fafc] py-16 border-t border-gray-200 text-gray-700">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-5">
              {/* <img src={logo} alt="Milk Powder Store" className="h-12" /> */}
              <h3 className="text-2xl font-extrabold text-gray-900">Milk Powder Store</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              Cửa hàng sữa bột chất lượng cao cho mọi gia đình.
            </p>
            <div className="flex space-x-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaSquareXTwitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagramSquare className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-red-600 transition-colors">
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-6 text-gray-900 font-semibold tracking-wide">Công ty</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm hover:text-rose-600 transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-rose-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-sm hover:text-rose-600 transition-colors">
                  Thẻ quà tặng
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm hover:text-rose-600 transition-colors">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-6 text-gray-900 font-semibold tracking-wide">Mua sắm</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/new-products" className="text-sm hover:text-rose-600 transition-colors">
                  Sản phẩm mới
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" className="text-sm hover:text-rose-600 transition-colors">
                  Bán chạy
                </Link>
              </li>
              <li>
                <Link to="/discounts" className="text-sm hover:text-rose-600 transition-colors">
                  Giảm giá
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-rose-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-6 text-gray-900 font-semibold tracking-wide">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm hover:text-rose-600 transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm hover:text-rose-600 transition-colors">
                  Vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm hover:text-rose-600 transition-colors">
                  Đổi trả
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="text-sm hover:text-rose-600 transition-colors">
                  Theo dõi đơn
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-gray-900 font-semibold tracking-wide">Liên hệ</h4>
            <address className="not-italic text-sm space-y-3 text-gray-600">
              <p>123 Nguyễn Văn A, TP.HCM</p>
              <p>0123 456 789</p>
              <p>support@milkstore.com</p>
            </address>
          </div>
        </div>

        {/* Bottom copyright and payment */}
        <div className="mt-16 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 Milk Powder Store. All rights reserved.</p>
          <img
            src="/images/img_paymenticons_1.svg"
            alt="Payment Methods"
            className="h-6 mt-4 md:mt-0"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

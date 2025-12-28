import { Link } from "react-router-dom";

interface Props {
  categoryName?: string;
}

const Breadcrumb = ({ categoryName }: Props) => {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link to="/" className="hover:text-blue-600">
        Trang chủ
      </Link>

      <span className="mx-2">/</span>

      <Link to="/products" className="hover:text-blue-600">
        Sữa bột
      </Link>

      {categoryName && (
        <>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-800">
            {categoryName}
          </span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;

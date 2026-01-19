import { Link } from "react-router-dom";

const categories = [
  { name: "Tất cả sữa bột", slug: "" },
  { name: "Sữa bột cho bé", slug: "sua-bot-cho-be" },
  { name: "Sữa bột cho người lớn", slug: "sua-bot-cho-nguoi-lon" },
  { name: "Khuyến mãi", slug: "sale" },
];

const CategoryList = () => {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6">
        Danh mục sữa bột
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.slug ? `/products/${cat.slug}` : "/products"}
            className="
              bg-white border rounded-lg px-4 py-6
              text-center font-medium
              hover:border-rose-500 hover:text-rose-600
              hover:shadow-sm transition
            "
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;

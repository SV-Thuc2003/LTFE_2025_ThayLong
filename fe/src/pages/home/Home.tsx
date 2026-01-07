// src/pages/Home.tsx
import CategoryList from "./CategoryList";
import Hero from "./Hero";
import ProductList from "../../components/product/ProductList";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Hero />

      <section className="my-8">
        <CategoryList />
      </section>

      {/* Sữa bột cho bé */}
      <section className="my-10">
        <h2 className="text-2xl font-semibold mb-4">Sữa bột cho bé</h2>
        <ProductList
          categorySlug="sua-bot-cho-be"
          pageSize={8}
          showPagination={false}
        />
      </section>

      {/* Sữa bột cho người lớn */}
      <section className="my-10">
        <h2 className="text-2xl font-semibold mb-4">Sữa bột cho người lớn</h2>
        <ProductList
          categorySlug="sua-bot-cho-nguoi-lon"
          pageSize={8}
          showPagination={false}
        />
      </section>
    </div>
  );
};

export default Home;

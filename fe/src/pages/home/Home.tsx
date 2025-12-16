// src/pages/Home.tsx
import Hero from './Hero';
import CategoryList from './CategoryList';
import ProductGrid from './ProductGrid';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      <Hero />

      {/* Categories */}
      <CategoryList />

      {/* Example product lists */}
      <ProductGrid title="Sản phẩm bán chạy" />

      <ProductGrid title="Sữa bột cho bé" />

      <ProductGrid title="Sữa cho người lớn" />
    </div>
  );
};

export default Home;

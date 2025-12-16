import  Header  from "../components/layout/header/Header";
import  Footer  from "../components/layout/footer/Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main content stretch để đẩy footer xuống đáy */}
      <main className="flex-grow px-4 py-6 max-w-5xl mx-auto w-full">
        <Outlet /> {/* Các route con sẽ được render ở đây */}
      </main>

      <Footer />
    </div>
  );
};

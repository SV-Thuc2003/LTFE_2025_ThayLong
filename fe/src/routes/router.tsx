import { Layout } from "../layouts/layout";
import { Route, Routes } from 'react-router-dom';
import HomePage from "../pages/home/Home";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductPage from "../pages/ProductPage";

const AppRoutes =() => {
    return (
        <Routes>
            <Route element={<Layout />} >
                <Route path="/" element={<HomePage />} />
                <Route path='/products' element={<ProductPage/>}/>
                <Route path="/products/:categorySlug" element={<ProductPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
            </Route>
            
        </Routes>
    );
};

export default AppRoutes;
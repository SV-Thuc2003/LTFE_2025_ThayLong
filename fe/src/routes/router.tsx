import { Layout } from "../layouts/layout";

import HomePage from "../pages/home/Home";

import LoginPage from "../pages/login/login";
import RegisterPage from "../pages/register/index";
import ForgotPassword from "../features/auth/forgotPassword/ForgotPassword";

import { Route, Routes } from 'react-router-dom';
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductPage from "../pages/ProductPage";
import CartCheckOut from "../pages/cart";

const AppRoutes =() => {
    return (
        <Routes>
            <Route element={<Layout />} >
                <Route path="/" element={<HomePage />} />
                <Route path='/products' element={<ProductPage/>}/>
                <Route path="/products/:categorySlug" element={<ProductPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* <Route path='/product' element={<Products/>}/> */}
                <Route path="/cart" element={<CartCheckOut />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
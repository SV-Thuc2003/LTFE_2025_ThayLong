
import { Route, Routes } from 'react-router-dom';
import { Layout } from "../layouts/layout";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/login";
import RegisterPage from "../pages/register/index";
import OAuth2RedirectHandler from '../features/auth/login/OAuth2RedirectHandler';
import ForgotPassword from "../features/auth/forgotPassword/ForgotPassword";
import ProfilePage from "../pages/profile";
import FavoriteProductsPage from "../pages/favorite/FavoriteProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductPage from "../pages/ProductPage";
import CartCheckOut from "../pages/cart";
import Checkout from "../pages/checkout";
import OrderSuccess from "../pages/order/OrderSuccess.tsx";
import Order from "../pages/order";

const AppRoutes =() => {
    return (
        <Routes>
            <Route element={<Layout />} >
                <Route path="/" element={<HomePage />} />
                <Route path='/products' element={<ProductPage/>}/>
                <Route path="/products/:categorySlug" element={<ProductPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />

                <Route path="/search" element={<ProductPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/favorites" element={<FavoriteProductsPage />} />

                {/* <Route path='/product' element={<Products/>}/> */}
                <Route path="/cart" element={<CartCheckOut />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/order-success" element={<OrderSuccess />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
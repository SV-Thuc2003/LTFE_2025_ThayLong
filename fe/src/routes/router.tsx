import { Layout } from "../layouts/layout";
import HomePage from "../pages/home/Home";
import Products from "../pages/products/product";
import LoginPage from "../pages/login/login";
import OAuth2RedirectHandler from '../features/auth/login/OAuth2RedirectHandler';
import RegisterPage from "../pages/register/index";
import ForgotPassword from "../features/auth/forgotPassword/ForgotPassword";
import { Route, Routes } from 'react-router-dom';
const AppRoutes =() => {
    return (
        <Routes>
            <Route element={<Layout />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path='/product' element={<Products/>}/>
            </Route>
            
        </Routes>
    );
};

export default AppRoutes;
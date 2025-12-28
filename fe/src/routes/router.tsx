import { Layout } from "../layouts/layout";
import HomePage from "../pages/home/Home";
import Products from "../pages/products/product";
import LoginPage from "../pages/login/login";
import RegisterPage from "../pages/register/index";
import { Route, Routes } from 'react-router-dom';
const AppRoutes =() => {
    return (
        <Routes>
            <Route element={<Layout />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/product' element={<Products/>}/>
            </Route>
            
        </Routes>
    );
};

export default AppRoutes;
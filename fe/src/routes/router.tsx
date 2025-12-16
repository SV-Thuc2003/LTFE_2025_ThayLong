import { Layout } from "../layouts/layout";
import HomePage from "../pages/home/Home";
import Products from "../pages/products/product";
import { Route, Routes } from 'react-router-dom';
const AppRoutes =() => {
    return (
        <Routes>
            <Route element={<Layout />} >
                <Route path="/" element={<HomePage />} />
                <Route path='/product' element={<Products/>}/>
            </Route>
            
        </Routes>
    );
};

export default AppRoutes;
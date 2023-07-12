import { Route, Routes } from 'react-router-dom';
import { HomeWork1, HomeWork2, Page404, HomeWork3, MainPage } from '../components/pages';
import { Shop } from '../components/Shop';
import { ProductList } from '../components/ProductList';
import { Cart } from '../components/Cart';
import { FavoriteProducts } from '../components/FavoriteProducts';
import ProductFullInfo from '../components/ProductFullInfo/ProductFullInfo';
import { CheckoutForm, ResultCheckout } from '../components/CheckoutForm';

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/hw1' element={<HomeWork1 />} />
            <Route path='/hw2' element={<HomeWork2 />} />
            <Route path='/hw3' element={<HomeWork3 />}></Route>
            <Route path='shop' element={<Shop />}>
                <Route index element={<ProductList />} />
                <Route path='checkout' element={<CheckoutForm />} />
                <Route path='favorite' element={<FavoriteProducts />} />
                <Route path='cart' element={<Cart />} />
                <Route path='result' element={<ResultCheckout />} />
            </Route>
            <Route path='shop/:id' element={<ProductFullInfo />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    );
};

export default Router;

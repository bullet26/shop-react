import { Button } from 'antd';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Select } from 'antd';
import { AppHeader } from '../AppHeader';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ErrorMessage } from '../UI/error';
import { choosenCategorySet } from '../slices/categorySlice';
import { fetchProducts } from '../slices/productSlice';
import { ShopProvider } from '../../context';

const Shop = () => {
    const { categories, choosenCategory } = useAppSelector(state => state.categories);
    const { productsLoadingStatus } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    const options: { value: string; label: string }[] = [];

    useEffect(() => {
        const category = choosenCategory || localStorage.getItem('choosenCategory') || '';
        dispatch(fetchProducts(category));
    }, [choosenCategory]);

    const SetContent = () => {
        if (productsLoadingStatus === 'loading') {
            return <h1>LOading</h1>;
        } else if (productsLoadingStatus === 'idle') {
            categories.map(item => options.push({ value: item, label: item[0].toUpperCase() + item.slice(1) }));

            return (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '25px' }}>
                        <AppHeader />
                        {!!categories.length && (
                            <Select
                                placeholder='Select product category'
                                style={{ width: 120 }}
                                onChange={e => {
                                    dispatch(choosenCategorySet(e));
                                }}
                                options={options}
                            />
                        )}
                    </div>
                    <ShopProvider>
                        <Outlet />
                    </ShopProvider>
                </>
            );
        } else {
            return <ErrorMessage />;
        }
    };

    return (
        <>
            <SetContent />
            <Link to='/'>
                <Button type='link'>Go To Home</Button>
            </Link>
        </>
    );
};

export default Shop;

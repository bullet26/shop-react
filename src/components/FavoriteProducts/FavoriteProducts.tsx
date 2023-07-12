import { FC } from 'react';
import { Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { ProductListItem } from '../ProductListItem';
import { ModalProduct } from '../Modals/';
import { addToCart, CartLength, fetchCartProduct } from '../slices/cartSlice';
import { selectAllFavorite } from '../slices/favoriteSlice';
import s from './FavoriteProducts.module.scss';

const FavoriteProducts: FC = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.products);
    const favoriteProducts = useAppSelector(selectAllFavorite);
    const cartLength = useAppSelector(CartLength);

    const renderProducts = () => {
        if (!!favoriteProducts.length) {
            const isStarred = true;

            return favoriteProducts.map(product => {
                const { id } = product;

                return <ProductListItem key={id} isStarred={isStarred} {...product} />;
            });
        } else {
            return <div className={s.no}>There isn`t any favorite product </div>;
        }
    };

    const updateCart = (id: number) => {
        const product = products.find(item => item.id === id);
        if (!!product) {
            dispatch(addToCart({ product }));
        } else {
            dispatch(fetchCartProduct(id));
        }
    };

    return (
        <>
            <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
                <h2 data-testid='favorite-page'>Favorite Products</h2>
                <div>
                    In cart <ShoppingCartOutlined /> : {cartLength}
                </div>

                <Space size='middle' style={{ display: 'flex' }}>
                    {renderProducts()}
                </Space>
                <ModalProduct functionHandleOK={updateCart} typeModal={'favorite'} />
            </Space>
        </>
    );
};

export default FavoriteProducts;

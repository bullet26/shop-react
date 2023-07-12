import { FC, useContext } from 'react';
import { Space } from 'antd';
import { ShoppingCartOutlined, StarTwoTone } from '@ant-design/icons';
import { ProductListItem, ProductListItemTable } from '../ProductListItem';
import { ModalProduct } from '../Modals';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { FavoriteLength, selectFavoriteId } from '../slices/favoriteSlice';
import { addToCart, CartLength, fetchCartProduct } from '../slices/cartSlice';
import { ContextStore } from '../../context';
import grid from './img/grid.svg';
import list from './img/list.svg';

const ProductList: FC = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.products);
    const cartLength = useAppSelector(CartLength);
    const favoriteLength = useAppSelector(FavoriteLength);
    const favoriteIDs = useAppSelector(selectFavoriteId);
    const { viewMode, setViewMode } = useContext(ContextStore);

    const renderProducts = () => {
        if (!!products.length) {
            return products.map(item => {
                const { id } = item;
                const isStarred = !!favoriteIDs.includes(id);

                if (viewMode === 'grid') {
                    return <ProductListItemTable key={id} {...item} />;
                } else if (viewMode === 'list') {
                    return <ProductListItem key={id} isStarred={isStarred} {...item} isShowCard={true} />;
                }
            });
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
                <h2>Product List</h2>
                <div style={{ display: 'flex', width: '280px', justifyContent: 'space-between' }}>
                    <div>Choose view mode</div>
                    <img src={grid} alt='grid' style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => setViewMode('grid')} />
                    <img src={list} alt='list' style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => setViewMode('list')} />
                </div>
                <div>
                    In cart <ShoppingCartOutlined /> : {cartLength}
                </div>
                <div>
                    In favorites <StarTwoTone />: {favoriteLength}
                </div>

                <Space size='middle' style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', flexWrap: 'wrap' }}>
                    {renderProducts()}
                </Space>
                <ModalProduct functionHandleOK={updateCart} typeModal={'product'} />
            </Space>
        </>
    );
};

export default ProductList;

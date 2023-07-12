/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Button } from 'antd';
import { useAppSelector } from '../../services/hooks';
import { ProductListItem } from '../ProductListItem';
import { ModalProduct } from '../Modals/';
import { deleteFromCart, selectAllCart } from '../slices/cartSlice';

import s from './Cart.module.scss';

const Cart: FC = () => {
    const navigate = useNavigate();
    const cart = useAppSelector(selectAllCart);

    const renderProducts = () => {
        if (!!cart.length) {
            return cart.map(item => {
                const { id } = item;

                return <ProductListItem key={id} {...item} isShowStar={false} buttonText={'DELETE ITEM'} />;
            });
        } else {
            return <div className={s.no}>There isn`t any product in cart </div>;
        }
    };

    return (
        <>
            <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
                <h2 data-testid='cart-page'>Cart</h2>

                <Space size='middle' style={{ display: 'flex', flexDirection: 'column' }}>
                    <Space size='middle' style={{ display: 'flex' }}>
                        {renderProducts()}
                    </Space>
                    {!!cart.length && (
                        <Button type='link' className={s.button} onClick={() => navigate('/shop/checkout')}>
                            <span>BUY</span>
                        </Button>
                    )}
                </Space>

                <ModalProduct functionHandleOKAction={deleteFromCart} typeModal={'cart'} />
            </Space>
        </>
    );
};

export default Cart;

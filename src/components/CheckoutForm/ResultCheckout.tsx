import { FC, useContext } from 'react';
import { Button, Result, Typography } from 'antd';
import { selectAllCart, clearCart } from '../slices/cartSlice';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { ContextStore } from '../../context';

const { Paragraph } = Typography;

export const ResultCheckout: FC = props => {
    const dispatch = useAppDispatch();
    const carts = useAppSelector(selectAllCart);
    const { customerInfo, setСustomerInfo } = useContext(ContextStore);

    const cartProducts = () => {
        return carts.map(item => {
            return (
                <span key={item.title}>
                    {item.title} - {item.quant}
                </span>
            );
        });
    };

    const formData = () => {
        return Object.entries(customerInfo).map(([key, value]) => {
            return (
                <span key={key}>
                    {key} - {typeof value !== 'string' ? String(value) : value}
                </span>
            );
        });
    };
    formData();

    const finalCheckoutActions = () => {
        dispatch(clearCart());
        setСustomerInfo({});
    };

    return (
        <>
            <Result
                status='success'
                title='Successfully Purchased'
                extra={[
                    <Button type='primary' key='final' onClick={finalCheckoutActions}>
                        OK
                    </Button>,
                ]}
            />
            {!!carts.length && (
                <Paragraph style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}> Purchased theese product(s): {cartProducts()}</Paragraph>
            )}
            {Object.hasOwn(customerInfo, 'surname') && (
                <Paragraph style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}> Verify your info: {formData()}</Paragraph>
            )}{' '}
        </>
    );
};

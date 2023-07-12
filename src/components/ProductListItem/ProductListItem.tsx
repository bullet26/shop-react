import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Space, InputNumber, Badge } from 'antd';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ButtonF } from '../UI/button';
import { ShoppingCartOutlined, StarTwoTone, ShoppingTwoTone } from '@ant-design/icons';
import { IProduct } from '../../type/interface';
import { choosenProductSet } from '../slices/productSlice';
import { addToFav, deleteFromFav, fetchFavoriteProduct, selectFavoriteId } from '../slices/favoriteSlice';
import { updateQuantProductsInCart } from '../slices/cartSlice';
import { setIsOpenModal } from '../slices/modalSlice';
import s from './ProductListItem.module.scss';

interface ProductListItemProps extends IProduct {
    isStarred?: boolean;
    isShowCard?: boolean;
    isShowStar?: boolean;
    buttonText?: string;
    quant?: number | string;
}

const ProductListItem: FC<ProductListItemProps> = props => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.products);
    const favoriteIDs = useAppSelector(selectFavoriteId);

    const { id, title, description, price, brand, category, thumbnail, isStarred, quant } = props;
    let { isShowStar, buttonText, isShowCard } = props;

    const { Meta } = Card;

    const [isShowChangeCounterinput, setIsShowChangeCounterinput] = useState(false);

    isShowStar = isShowStar ?? true;
    isShowCard = isShowCard ?? false;
    buttonText ||= 'ADD TO CART';

    const showModal = (id: number) => {
        dispatch(choosenProductSet(id));
        dispatch(setIsOpenModal(true));
    };

    const UpdateFavorite = (id: number) => {
        if (!favoriteIDs.includes(id)) {
            let product = products.find(item => item.id === id);

            if (!product) {
                dispatch(fetchFavoriteProduct(id));
            } else {
                dispatch(addToFav(product));
            }
        } else {
            dispatch(deleteFromFav(id));
        }
    };

    return (
        <>
            <Card id={String(id)} hoverable style={{ width: 250 }} cover={<img alt='product-img' src={thumbnail} style={{ height: 250, objectFit: 'contain' }} />}>
                <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
                    {!!quant && (
                        <div className={s.wrapper}>
                            <div
                                className={s.wrapperInner}
                                onClick={() => {
                                    setIsShowChangeCounterinput(!isShowChangeCounterinput);
                                }}
                            >
                                <Badge count={quant} overflowCount={99} color='black'>
                                    <ShoppingTwoTone style={{ fontSize: '36px' }} />
                                </Badge>
                            </div>
                            {isShowChangeCounterinput && (
                                <InputNumber
                                    defaultValue={quant}
                                    onBlur={e => {
                                        let value: string | number = e.target.value;
                                        if (typeof value !== 'number') {
                                            value = Number(value);
                                        } else if (!value || value < 0) {
                                            value = 1;
                                        }

                                        dispatch(updateQuantProductsInCart({ value, id }));
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <Space size='large' style={{ display: 'flex' }}>
                        {!!isShowStar && <StarTwoTone style={{ fontSize: '26px' }} twoToneColor={isStarred ? 'orange' : 'blue'} onClick={() => UpdateFavorite(id)} />}
                        <Meta title={title.slice(0, 19)} />
                    </Space>
                    <div className='description'>{description}</div>
                    <div className='brand'>{`${brand} - ${category}`}</div>
                    <Space size='large' style={{ display: 'flex' }}></Space>
                    <div className='price'>{price} $</div>
                    {isShowCard && (
                        <NavLink to={`/shop/${id}`} className={s.infobtn} type='link'>
                            Show product card
                        </NavLink>
                    )}

                    <ButtonF backgroundColor='#1e1e20' colorText='white' labelId={id} buttonOnClickFunc={showModal}>
                        <ShoppingCartOutlined />
                        <span>{buttonText}</span>
                    </ButtonF>
                </Space>
            </Card>
        </>
    );
};

export default ProductListItem;

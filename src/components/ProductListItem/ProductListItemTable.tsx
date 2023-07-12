import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from 'antd';
import { IProduct } from '../../type/interface';

import s from './ProductListItem.module.scss';

interface ProductListItemProps extends IProduct {
    isStarred?: boolean;
    isShowCard?: boolean;
    isShowStar?: boolean;
    buttonText?: string;
    quant?: number | string;
}

const ProductListItem: FC<ProductListItemProps> = props => {
    const { id, title, description, price, brand } = props;

    return (
        <>
            <Card id={id.toString()} title={title} bordered={false} style={{ width: 300 }}>
                <p>{brand}</p>
                <p>{description}</p>
                <p>{price} $</p>
                <NavLink to={`/shop/${id}`} className={s.infobtn} type='link'>
                    Show product card
                </NavLink>
            </Card>
        </>
    );
};

export default ProductListItem;

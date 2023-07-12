import { Component, ReactNode } from 'react';
import { Card, Space } from 'antd';
import { ButtonC } from '../UI/button';
import { ShoppingCartOutlined, StarTwoTone } from '@ant-design/icons';
import { IProduct } from '../../type/interface';

interface ProductListItemProps extends IProduct {
    showModal: (title?: number) => void;
    addToFavorites: (id: string) => void;
    isStarred: boolean;
}

class ProductListItemC extends Component<ProductListItemProps> {
    render(): ReactNode {
        const { Meta } = Card;
        const { id, title, description, price, brand, category, thumbnail, showModal, isStarred, addToFavorites } = this.props;
        return (
            <Card id={id.toString()} hoverable style={{ width: 250 }} cover={<img alt='product-img' src={thumbnail} style={{ height: 250, objectFit: 'contain' }} />}>
                <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
                    <Space size='large' style={{ display: 'flex' }}>
                        <StarTwoTone twoToneColor={isStarred ? 'orange' : 'blue'} onClick={() => addToFavorites(String(id))} />
                        <Meta title={title.slice(0, 19)} />
                    </Space>
                    <div className='description'>{description}</div>
                    <div className='brand'>
                        {brand} - {category}
                    </div>
                    <Space size='large' style={{ display: 'flex' }}>
                        <div className='price'>{price} $</div>
                        <ButtonC backgroundColor='#1e1e20' colorText='white' labelId={id} showModal={showModal}>
                            <ShoppingCartOutlined />
                            <span>ADD TO CART</span>
                        </ButtonC>
                    </Space>
                </Space>
            </Card>
        );
    }
}

export default ProductListItemC;

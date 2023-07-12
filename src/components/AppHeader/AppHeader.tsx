import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const AppHeader: FC = () => {
    return (
        <>
            <Link to='/shop' data-testid='shop-link'>
                <Button type='link'>ProductList</Button>
            </Link>
            <Link to='cart' data-testid='cart-link'>
                <Button type='link'>Cart</Button>
            </Link>
            <Link to='favorite' data-testid='favorite-link'>
                <Button type='link'>Favorite Products</Button>
            </Link>
        </>
    );
};

export default AppHeader;

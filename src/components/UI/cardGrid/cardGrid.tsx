import { FC } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../services/hooks';
import { choosenCategorySet } from '../../slices/categorySlice';

import s from './cardGrid.module.scss';

const CardGrid: FC = () => {
    const { categories } = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <Card title={<h1 style={{ textAlign: 'center' }}>Select product category</h1>}>
            {categories.map(item => {
                return (
                    <Card.Grid
                        key={item}
                        style={{ width: '15%' }}
                        className={s.gridStyle}
                        onClick={() => {
                            dispatch(choosenCategorySet(item));
                            navigate('/shop');
                        }}
                    >
                        {item[0].toUpperCase() + item.slice(1)}
                    </Card.Grid>
                );
            })}
        </Card>
    );
};

export default CardGrid;

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const MainPage: FC = () => {
    return (
        <>
            <Link to='hw1'>
                <Button type='link'>HomeWork1</Button>
            </Link>
            <Link to='hw2'>
                <Button type='link'>HomeWork2</Button>
            </Link>
            <Link to='hw3'>
                <Button type='link'>HomeWork3-5</Button>
            </Link>
        </>
    );
};

export default MainPage;

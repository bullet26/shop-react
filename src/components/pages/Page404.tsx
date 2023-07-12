import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import img from '../../assets/error.gif';

class Page404 extends Component {
    render(): ReactNode {
        return (
            <div>
                <img style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} src={img} alt='Error' />
                <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Page doesn`t exist</p>
                <Link to='/'>
                    <Button type='link'>Go To Home</Button>
                </Link>
            </div>
        );
    }
}

export default Page404;

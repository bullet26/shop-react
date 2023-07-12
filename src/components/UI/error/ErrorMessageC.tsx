import { Component, ReactNode } from 'react';
import img from '../../../assets/error.gif';

class ErrorMessageC extends Component {
    render(): ReactNode {
        return (
            <>
                <img style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} src={img} alt='Error' />
                <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Something went wrong</p>
            </>
        );
    }
}

export default ErrorMessageC;

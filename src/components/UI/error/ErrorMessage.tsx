import { FC } from 'react';
import img from '../../../assets/error.gif';

const ErrorMessage: FC = () => {
    return (
        <>
            <img style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} src={img} alt='Error' />
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Something went wrong</p>
        </>
    );
};

export default ErrorMessage;

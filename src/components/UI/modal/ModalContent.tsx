import { FC, ReactNode } from 'react';
import s from './/ModalContent.module.scss';

interface ModalContentProps {
    children: ReactNode;
}

const ModalContent: FC<ModalContentProps> = props => {
    const { children } = props;
    return (
        <>
            <div className={s.descr}>{children}</div>
        </>
    );
};

export default ModalContent;

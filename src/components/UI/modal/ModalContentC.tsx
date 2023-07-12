import { Component, ReactNode } from 'react';
import s from './/ModalContent.module.scss';

interface ModalContentProps {
    children: ReactNode;
}

class ModalContentC extends Component<ModalContentProps> {
    render() {
        const { children } = this.props;
        return (
            <>
                <div className={s.descr}>{children}</div>
            </>
        );
    }
}

export default ModalContentC;

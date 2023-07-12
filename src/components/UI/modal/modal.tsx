import { FC, ReactNode } from 'react';
import { Modal } from 'antd';

interface ModalProps {
    cancelText?: string;
    okText?: string;
    id: number;
    closeButton: boolean;
    isOpen: boolean;
    header: string;
    children: ReactNode;
    handleOk: (id: number) => void;
    handleCancel: () => void;
}

const ModalF: FC<ModalProps> = props => {
    const { children, header, isOpen, closeButton, handleOk, handleCancel, cancelText, okText, id } = props;
    return (
        <Modal title={header} open={isOpen} closable={closeButton} onOk={() => handleOk(id)} onCancel={handleCancel} cancelText={cancelText || 'Cancel'} okText={okText || 'Ok'}>
            {children}
        </Modal>
    );
};

export default ModalF;

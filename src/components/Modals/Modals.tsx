import { FC } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Modal, ModalContent } from '../UI/modal';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { selectAllFavorite } from '../slices/favoriteSlice';
import { selectAllCart } from '../slices/cartSlice';
import { setIsOpenModal } from '../slices/modalSlice';
import { IProduct } from '../../type/interface';

interface IModalProduct {
    functionHandleOKAction?: ActionCreatorWithPayload<number, string>;
    functionHandleOK?: (id: number) => void;
    typeModal: string;
}

const ModalProduct: FC<IModalProduct> = props => {
    const dispatch = useAppDispatch();
    const { products, choosenProduct } = useAppSelector(state => state.products);
    const favorites = useAppSelector(selectAllFavorite);
    const carts = useAppSelector(selectAllCart);

    const { isOpenModal } = useAppSelector(state => state.modal);

    const { functionHandleOKAction, functionHandleOK, typeModal } = props;

    const findTitle = (arr: IProduct[]) => arr?.find(item => item.id === choosenProduct)?.title;

    const choosenTitle = findTitle(products) || findTitle(favorites) || findTitle(carts);

    const handleOk = (id: number) => {
        dispatch(setIsOpenModal(false));

        if (!!functionHandleOKAction) {
            dispatch(functionHandleOKAction(id));
        } else if (!!functionHandleOK) {
            functionHandleOK(id);
        }
    };

    const handleCancel = () => {
        dispatch(setIsOpenModal(false));
    };

    const Product = () => {
        return (
            <Modal header={choosenTitle || 'Add to cart'} isOpen={isOpenModal} closeButton={true} handleOk={handleOk} handleCancel={handleCancel} cancelText={'NO'} okText={'Yes'} id={choosenProduct}>
                <ModalContent>
                    Add to cart: {choosenTitle} <br></br>Are you sure?
                </ModalContent>
            </Modal>
        );
    };

    const Favorite = () => {
        return (
            <Modal header={choosenTitle || 'Add to cart'} isOpen={isOpenModal} closeButton={true} handleOk={handleOk} handleCancel={handleCancel} cancelText={'NO'} okText={'Yes'} id={choosenProduct}>
                <ModalContent>
                    Add to cart your favorite product: {choosenTitle}. <br></br>Are you sure?
                </ModalContent>
            </Modal>
        );
    };
    const Cart = () => {
        return (
            <Modal
                header={choosenTitle || 'Delete from cart'}
                isOpen={isOpenModal}
                closeButton={true}
                handleOk={handleOk}
                handleCancel={handleCancel}
                cancelText={'NO'}
                okText={'Yes'}
                id={choosenProduct}
            >
                <ModalContent>
                    Delete the {choosenTitle || 'product'} from cart<br></br>Are you sure?
                </ModalContent>
            </Modal>
        );
    };

    switch (typeModal) {
        case 'product':
            return <Product />;
        case 'favorite':
            return <Favorite />;
        case 'cart':
            return <Cart />;

        default:
            return <>Modal not found</>;
    }
};

export { ModalProduct };

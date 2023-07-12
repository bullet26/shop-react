import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerInfo } from '../../type/interface';

interface modalState {
    isOpenModal: boolean;
    CustomerInfo: CustomerInfo;
}

const initialState: modalState = {
    isOpenModal: false,
    CustomerInfo: { name: '', surname: '', age: 0, address: '', phone: '', terms: false },
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsOpenModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenModal = action.payload;
        },
    },
});

const { actions, reducer } = modalSlice;

export default reducer;
export const { setIsOpenModal } = actions;

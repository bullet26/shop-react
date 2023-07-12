import { createSlice, PayloadAction, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../services/request';
import { IProduct } from '../../type/interface';
import { RootState } from '../../store';

interface Icart extends IProduct {
    quant?: number;
}

interface cartState extends Icart {
    productCartLoadingStatus?: 'idle' | 'loading' | 'error';
}

const cartAdapter = createEntityAdapter<cartState>();

const initialState = cartAdapter.getInitialState({
    productCartLoadingStatus: 'idle',
});

export const fetchCartProduct = createAsyncThunk<IProduct, number>('favorite/fetchCartProduct', id => {
    return request<IProduct>(`products/${id}`);
});

const { selectAll: selectAllCart, selectIds: selectCartId, selectTotal: CartLength } = cartAdapter.getSelectors((state: RootState) => state.cart);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ quant?: number; product: IProduct }>) => {
            const { id } = action.payload.product;

            const item = cartAdapter.getSelectors().selectById(state, id);
            let quant = !!item?.quant ? item.quant : 0;

            quant = !!action.payload.quant ? quant + action.payload.quant : ++quant;

            cartAdapter.upsertOne(state, { ...action.payload.product, quant });
        },
        deleteFromCart: (state, action: PayloadAction<number>) => {
            cartAdapter.removeOne(state, action.payload);
        },
        clearCart: state => {
            cartAdapter.removeAll(state);
        },
        updateQuantProductsInCart: (state, action: PayloadAction<{ value: number; id: number }>) => {
            const { value, id } = action.payload;
            cartAdapter.updateOne(state, { id, changes: { quant: value } });
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCartProduct.pending, state => {
                state.productCartLoadingStatus = 'loading';
            })
            .addCase(fetchCartProduct.fulfilled, (state, action) => {
                const { id } = action.payload;
                const item = cartAdapter.getSelectors().selectById(state, id);
                let quant = !!item?.quant ? item.quant : 0;
                quant += 1;

                state.productCartLoadingStatus = 'idle';
                cartAdapter.setOne(state, { ...action.payload, quant });
            })
            .addCase(fetchCartProduct.rejected, state => {
                state.productCartLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = cartSlice;

export default reducer;
export const { addToCart, deleteFromCart, clearCart, updateQuantProductsInCart } = actions;

export { selectAllCart, selectCartId, CartLength };

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../services/request';
import { IProduct, IProductResp } from '../../type/interface';

interface productState {
    products: IProduct[];
    productsLoadingStatus: 'idle' | 'loading' | 'error';
    choosenProduct: number;
}

const initialState: productState = {
    products: [],
    productsLoadingStatus: 'idle',
    choosenProduct: 0,
};

export const fetchProducts = createAsyncThunk<IProductResp, string>('products/fetchProducts', category => {
    return request<IProductResp>(`products/category/${category}`);
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        choosenProductSet: (state, action: PayloadAction<number>) => {
            state.choosenProduct = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.productsLoadingStatus = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoadingStatus = 'idle';
                state.products = action.payload.products;
            })
            .addCase(fetchProducts.rejected, state => {
                state.productsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = productsSlice;

export default reducer;
export const { choosenProductSet } = actions;

import { createSlice, PayloadAction, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../services/request';
import { IProduct } from '../../type/interface';
import { RootState } from '../../store';

interface favoriteState extends IProduct {
    productFavoriteLoadingStatus?: 'idle' | 'loading' | 'error';
}

const favoriteAdapter = createEntityAdapter<favoriteState>();

const initialState = favoriteAdapter.getInitialState({
    productFavoriteLoadingStatus: 'idle',
});

export const fetchFavoriteProduct = createAsyncThunk<IProduct, number>('favorite/fetchFavoriteProduct', id => {
    return request<IProduct>(`products/${id}`);
});

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFav: (state, action: PayloadAction<IProduct>) => {
            favoriteAdapter.addOne(state, action.payload);
        },
        deleteFromFav: (state, action: PayloadAction<number>) => {
            favoriteAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFavoriteProduct.pending, state => {
                state.productFavoriteLoadingStatus = 'loading';
            })
            .addCase(fetchFavoriteProduct.fulfilled, (state, action) => {
                state.productFavoriteLoadingStatus = 'idle';
                favoriteAdapter.setOne(state, action.payload);
            })
            .addCase(fetchFavoriteProduct.rejected, state => {
                state.productFavoriteLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = favoriteSlice;

export default reducer;
export const { addToFav, deleteFromFav } = actions;

const { selectAll: selectAllFavorite, selectIds: selectFavoriteId, selectTotal: FavoriteLength } = favoriteAdapter.getSelectors((state: RootState) => state.favorite);

export { selectAllFavorite, selectFavoriteId, FavoriteLength };

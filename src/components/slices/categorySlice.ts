import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../services/request';

interface categoriesState {
    categories: string[];
    choosenCategory: string;
    categoriesLoadingStatus: 'idle' | 'loading' | 'error';
}

const initialState: categoriesState = {
    categories: [],
    choosenCategory: '',
    categoriesLoadingStatus: 'idle',
};

export const fetchCategories = createAsyncThunk('categories/fetchCategoties', () => {
    return request<string[]>('products/categories');
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        choosenCategorySet: (state, action: PayloadAction<string>) => {
            state.choosenCategory = action.payload;
            localStorage.setItem('choosenCategory', action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, state => {
                state.categoriesLoadingStatus = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoriesLoadingStatus = 'idle';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, state => {
                state.categoriesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = categoriesSlice;

export default reducer;
export const { choosenCategorySet } = actions;

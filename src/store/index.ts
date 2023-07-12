import { configureStore } from '@reduxjs/toolkit';
import categories from '../components/slices/categorySlice';
import products from '../components/slices/productSlice';
import modal from '../components/slices/modalSlice';
import favorite from '../components/slices/favoriteSlice';
import cart from '../components/slices/cartSlice';

const store = configureStore({
    reducer: {
        categories,
        products,
        modal,
        favorite,
        cart,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

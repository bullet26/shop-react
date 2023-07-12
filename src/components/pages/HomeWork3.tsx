import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ErrorMessage } from '../UI/error';
import { Slider } from '../UI/slider';
import { CardGrid } from '../UI/cardGrid';
import { fetchCategories } from '../slices/categorySlice';

const HomeWork3: FC = () => {
    const { categoriesLoadingStatus } = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const SetContent = () => {
        if (categoriesLoadingStatus === 'loading') {
            return <h1>LOading</h1>;
        } else if (categoriesLoadingStatus === 'idle') {
            return (
                <>
                    <Slider />
                    <CardGrid />
                </>
            );
        } else {
            return <ErrorMessage />;
        }
    };
    return <SetContent />;
};

export default HomeWork3;

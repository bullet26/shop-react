import { FC, ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';
import { CustomerInfo } from '../type/interface';

interface IShopProvider {
    children: ReactNode;
}

type viewMode = 'list' | 'grid';
interface IContext {
    viewMode: viewMode;
    setViewMode: Dispatch<SetStateAction<viewMode>>;
    customerInfo: CustomerInfo | {};
    setСustomerInfo: Dispatch<SetStateAction<CustomerInfo | {}>>;
}

export const ContextStore = createContext<IContext>({ viewMode: 'grid', customerInfo: {}, setСustomerInfo: () => {}, setViewMode: () => {} });

export const ShopProvider: FC<IShopProvider> = props => {
    const [viewMode, setViewMode] = useState<viewMode>('list');
    const [customerInfo, setСustomerInfo] = useState({});

    return <ContextStore.Provider value={{ viewMode, setViewMode, customerInfo, setСustomerInfo }}> {props.children}</ContextStore.Provider>;
};

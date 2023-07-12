export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    thumbnail: string;
    images?: string[];
}

export interface IProductResp {
    products: IProduct[];
    limit?: number;
    skip?: number;
    total?: number;
}

export interface CustomerInfo {
    name: string;
    surname: string;
    age: number;
    address: string;
    phone: string;
    terms: boolean;
}

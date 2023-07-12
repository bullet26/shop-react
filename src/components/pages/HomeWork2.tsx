import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, StarTwoTone } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { IProduct, IProductResp } from '../../type/interface';
import { ErrorMessageC } from '../UI/error';
import { request } from '../../services/request';
import { ProductListItemC } from '../ProductListItem';
import { ModalC, ModalContentC } from '../UI/modal/';

interface IListProduct extends IProduct {
    isStarred: boolean;
}
interface HW2State {
    isOpenModal: boolean;
    products: IListProduct[];
    error: boolean;
    choosenItem: number;
    addedtoCart: string[];
}

class HomeWork2 extends Component {
    componentDidMount() {
        this.getProductsList();
    }

    state: HW2State = {
        isOpenModal: false,
        products: [],
        error: false,
        choosenItem: 0,
        addedtoCart: [],
    };

    getProductsList = async () => {
        try {
            const { products } = await request<IProductResp>('products/category/womens-jewellery');

            !!products &&
                this.setState({
                    products: products.map(item => ({ ...item, isStarred: false })),
                });
        } catch (error) {
            this.setState({
                error: true,
            });
        }
    };

    showModal = (id?: number): void => {
        this.setState({
            isOpenModal: true,
        });
        id &&
            this.setState({
                choosenItem: id,
            });
    };

    handleOk = (id?: number): void => {
        this.setState({ isOpenModal: false });

        id &&
            this.setState({
                addedtoCart: [...this.state.addedtoCart, id],
            });
        localStorage.setItem('cart', this.state.addedtoCart.length.toString());
    };

    handleCancel = (): void => {
        this.setState({
            isOpenModal: false,
        });
    };

    addToFavorites = (id: string): void => {
        this.setState({
            products: this.state.products.map(item => {
                if (String(item.id) === id) {
                    return { ...item, isStarred: !item.isStarred };
                }
                return item;
            }),
            //
        });
    };

    renderProducts = () => {
        const { products } = this.state;

        if (!!products.length) {
            return products.map(item => {
                const { id, title, description, price, brand, category, thumbnail, isStarred } = item;

                return (
                    <ProductListItemC
                        key={id}
                        isStarred={isStarred}
                        thumbnail={thumbnail}
                        id={id}
                        title={title}
                        description={description}
                        price={price}
                        brand={brand}
                        category={category}
                        showModal={this.showModal}
                        addToFavorites={this.addToFavorites}
                    />
                );
            });
        }
    };

    render(): ReactNode {
        const choosenTitle = this.state.products.find(item => item.id === this.state.choosenItem)?.title;
        const { addedtoCart, error, products } = this.state;
        const addedtoFavorites = products.filter(item => item.isStarred === true);
        const setContent = error ? <ErrorMessageC /> : this.renderProducts();

        return (
            <>
                <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
                    <h1>HomeWork2</h1>
                    <div>
                        In cart <ShoppingCartOutlined /> : {addedtoCart.length}
                    </div>
                    <div>
                        In favorites <StarTwoTone />: {addedtoFavorites.length}
                    </div>
                    <Space size='middle' style={{ display: 'flex' }}>
                        {setContent}
                    </Space>
                    <ModalC
                        header={choosenTitle || 'Add to cart'}
                        isOpen={this.state.isOpenModal}
                        closeButton={true}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        cancelText={'NO'}
                        okText={'Yes'}
                        id={this.state.choosenItem}
                    >
                        <ModalContentC>
                            Add to cart. <br></br>Are you sure?
                        </ModalContentC>
                    </ModalC>

                    <Link to='/'>
                        <Button type='link'>Go To Home</Button>
                    </Link>
                </Space>
            </>
        );
    }
}

export default HomeWork2;

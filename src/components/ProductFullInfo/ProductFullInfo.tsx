import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Image, Descriptions, Carousel, InputNumber } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { fetchCartProduct, addToCart } from '../slices/cartSlice';
import { ButtonF } from '../UI/button';
import s from './ProductFullInfo.module.scss';

const ProductFullInfo: FC = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.products);
    const [inputValue, setInputValue] = useState(1);

    const navigate = useNavigate();
    const { id } = useParams();
    let idCart: number;
    !!id ? (idCart = Number(id)) : (idCart = 1);

    const product = products.find(item => item.id === Number(id));

    const images = () => {
        return product?.images?.map((item, i) => {
            return <img key={i} src={item} alt='product-img' />;
        });
    };
    const goBack = () => {
        navigate(-1);
    };

    const updateCart = () => {
        if (!!product) {
            dispatch(addToCart({ quant: inputValue, product }));
        } else {
            dispatch(fetchCartProduct(idCart));
        }
    };

    return (
        <>
            {!!product && (
                <>
                    <div className={s.wrapper}>
                        <Image width={300} src={product?.thumbnail} />
                        <div className={s.innerwrapper}>
                            <h1>{product.title}</h1>
                            <div>PRICE - {product.price} $</div>
                            <div className={s.cartwrapper}>
                                <InputNumber
                                    defaultValue={inputValue}
                                    onChange={e => {
                                        if (!!e && typeof e !== 'number') {
                                            setInputValue(Number(e));
                                        } else if (!e || e < 0) {
                                            setInputValue(1);
                                        } else {
                                            setInputValue(e);
                                        }
                                    }}
                                />
                                <ButtonF backgroundColor='#1e1e20' colorText='white' labelId={idCart} buttonOnClickFunc={updateCart}>
                                    <ShoppingCartOutlined />
                                    <span>ADD TO CART</span>
                                </ButtonF>
                            </div>

                            <Descriptions bordered title='Full info'>
                                <Descriptions.Item label='Product'>{product.title}</Descriptions.Item>
                                <Descriptions.Item label='Brand'>{product.brand}</Descriptions.Item>
                                <Descriptions.Item label='Category'>{product.category}</Descriptions.Item>
                                <Descriptions.Item label='Price'>{product.price} $</Descriptions.Item>
                                <Descriptions.Item label='Description'>{product.description}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>

                    {!!product?.images?.length && (
                        <div className={s.wrapper}>
                            <Carousel className={s.slider} effect='fade'>
                                {images()}
                            </Carousel>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eius vero libero? Amet corrupti nulla laboriosam, est illo consectetur nostrum! Quidem dolores, ipsa
                                nam alias amet eveniet libero aut odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eius vero libero? Amet corrupti nulla laboriosam, est illo
                                consectetur nostrum! Quidem dolores, ipsa nam alias amet eveniet libero aut odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eius vero libero?
                                Amet corrupti nulla laboriosam, est illo consectetur nostrum! Quidem dolores, ipsa nam alias amet eveniet libero aut odio.v
                            </p>
                        </div>
                    )}
                </>
            )}
            <div onClick={goBack} className={s.back}>
                back
            </div>
        </>
    );
};

export default ProductFullInfo;

import { FC } from 'react';
import { Carousel } from 'antd';
import s from './slider.module.scss';
import laptop1 from './img/1920.webp';
import laptop2 from './img/msi-summer-promo-laptop-1.png';
import laptop4 from './img/xiaomi-mi-gaming-laptop-2019-xiaomiplanet-cover.jpg';
import laptop3 from './img/gaming-laptop-sale-promotion-social-media-post_252779-759.avif';

const Slider: FC = () => (
    <Carousel autoplay>
        <div>
            <h3 className={s.contentStyle}>
                <img src={laptop1} alt='laptop' />
            </h3>
        </div>
        <div>
            <h3 className={s.contentStyle}>
                <img src={laptop2} alt='laptop' />
            </h3>
        </div>
        <div>
            <h3 className={s.contentStyle}>
                <img src={laptop3} alt='laptop' />
            </h3>
        </div>
        <div>
            <h3 className={s.contentStyle}>
                <img src={laptop4} alt='laptop' />
            </h3>
        </div>
    </Carousel>
);

export default Slider;

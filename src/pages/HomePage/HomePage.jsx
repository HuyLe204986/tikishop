import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperTypeProduct, WrapperProducts } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.jpg';
import slider4 from '../../assets/images/slider4.jpg';
import slider5 from '../../assets/images/slider5.jpg';
import slider6 from '../../assets/images/slider6.png';
import slider7 from '../../assets/images/slider7.jpg';
import slider8 from '../../assets/images/slider8.png';
import slider9 from '../../assets/images/slider9.png';
import slider10 from '../../assets/images/slider10.jpg';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useQuery } from '@tanstack/react-query';
import * as productService from '../../services/ProductService';
const HomePage = () => {
    const arr = ['Điện thoại', 'Máy tính bảng', 'Laptop', 'Đồng hồ'];
    const fetchProductAll = async () => {
        const res = await productService.getAllProduct();
        return res;
    }
    const {isLoading, data: products} = useQuery({
        queryKey: ['product'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000
    })
    console.log('data', products);
    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return <TypeProduct name={item} key={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ margin: '0 auto', height: '1000px', width: '1270px' }}>
                    <SliderComponent
                        arrImages={[
                            slider1,
                            slider2,
                            slider3,
                            slider4,
                            slider5,
                            slider6,
                            slider7,
                            slider8,
                            slider9,
                            slider10,
                        ]}
                    />
                    <WrapperProducts>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent 
                                    key={product._id}
                                    conutInStock = {product.conutInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                        <WrapperButtonMore
                            textButton="Xem thêm"
                            type="outline"
                            styleButton={{
                                border: '1px solid rgb(11, 116, 229)',
                                color: 'rgb(11, 116, 229)',
                                width: '240px',
                                height: '38px',
                                borderRadius: '4px',
                            }}
                            styleTextButton={{fontWeight: 500}}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;

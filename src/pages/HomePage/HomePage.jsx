import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect } from 'react';
const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [limit, setLimit] = useState(6)
    const [loading, setLoading] = useState(false)
    const [typeProducts, setTypeProducts] = useState([])

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await productService.getAllProduct(search, limit);
        return res;   
    }
    
    const fetchAllTypeProduct = async () => {
        const res = await productService.getAllTypeProduct()
        if(res?.status === 'OK') {
          setTypeProducts(res?.data)
        }
    }

    useEffect(() => {
        fetchAllTypeProduct()
      }, [])

    const {isLoading, data: products, isPlaceholderData } = useQuery({
        queryKey: ['product', limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        placeholderData: true
    })
    return (
        <Loading isLoading={isLoading || loading}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
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
                                    id={product._id}
                                />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                        <WrapperButtonMore
                            textButton="Xem thêm"
                            type="outline"
                            styleButton={{
                                border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
                                color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
                                width: '240px',
                                height: '38px',
                                borderRadius: '4px',
                            }}
                            disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                            styleTextButton={{fontWeight: 500, color: products?.total === products?.data?.length && '#fff'}}
                            onClick = {() => setLimit((prev) => prev + 6)}
                        />
                    </div>
                </div>
            </div>
        </Loading>
    );
};

export default HomePage;

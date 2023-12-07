import { Row, Col, Image, Rate } from 'antd';
import React from 'react';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import imageProduct from '../../assets/images/product-img.webp';
import imageProductSmall from '../../assets/images/product-img-small.webp';
import {
    WrapperAddressProduct,
    WrapperInputNumber,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperQuanlityProduct,
    WrapperStyleColImage,
    WrapperStyleImageSmall,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
} from './style';
import * as productService from '../../services/ProductService';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1)
    const user  = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const onChange = (value) => {
        setNumProduct(Number(value));
    };
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await productService.getDetailsProduct(id);
            return res.data;
        }
    };
    
    const handleChangeCount = (type, limited) => {
        if(type === 'increase') {
            if(!limited) {
                setNumProduct(numProduct + 1)
            }
        }else {
            if(!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }
    const handleAddOrderProduct = () => {
        if(!user?.id) {
            //dùng location pathname để khi đăng nhập thành công thì vẫn ở trang đặt hàng thay vì homepage
            navigate('/sign-in', {state: location?.pathname})
        }else {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id,
                    // discount: productDetails?.discount,
                    // countInstock: productDetails?.countInStock
                }
            }))
        }
    }
    
    const { isLoading, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct], 
        queryFn: fetchGetDetailsProduct, 
        enabled: !!idProduct
    });
    console.log('productDetails', productDetails);
    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} alt="image-product" preview={true} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image-product-small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image-product-small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image-product-small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image-product-small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image-product-small" preview={false} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image-product-small" preview={false} />
                        </WrapperStyleColImage>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                    <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className="address">{user?.address}</span> -
                        <span className="change-address"> Đổi địa chỉ</span>
                    </WrapperAddressProduct>

                    <div
                        style={{
                            margin: '10px 0 20px',
                            padding: '10px 0',
                            borderTop: '1px solid #e5e5e5',
                            borderBottom: '1px solid #e5e5e5',
                        }}
                    >
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQuanlityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor:'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber  onChange={onChange} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor:'pointer' }} onClick={() => handleChangeCount('increase')}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQuanlityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            onClick={handleAddOrderProduct}
                            textButton={'Chọn mua'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>

                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                borderRadius: '4px',
                            }}
                            textButton={'Mua trả sau'}
                            styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        ></ButtonComponent>
                    </div>
                </Col>
            </Row>
        </Loading>
    );
};

export default ProductDetailsComponent;

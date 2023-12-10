import { Card } from 'antd';
import styled from 'styled-components';

export const WrapperCardStyle = styled(Card)`
    with: 200px;
    & img {
        height: 200px;
        width: 200px;
    }
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`
export const WrapperImageStyle = styled.img`
    position: absolute;
    top: -1px;
    left: -1px;
    border-top-left-radius: 3px;
    height: 14px;
    width: 68px;
`


export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
`;

export const WrapperReportText = styled.div`
    font-size: 10px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`;

export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`;

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`


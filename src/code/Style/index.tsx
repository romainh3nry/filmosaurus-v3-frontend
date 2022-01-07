import styled from 'styled-components'
import { Link } from "react-router-dom";

export const Container = styled.div<{
    marginTop?: string
    display?: string
    width: string
    flexDirection?: string
    animation?: string
}>`
    margin: auto;
    width: ${p => p.width};
    margin-top: ${p => p.marginTop};
    display: ${p => p.display};
    flex-direction: ${p => p.flexDirection};
    animation: ${p => p.animation};

    @media only screen and (max-width: 1080px) {
        width: 90%;
        font-size: 15px;
    }

    @keyframes fadeIn {
        0% {opacity:0;}
        50% {opacity:0.5;}
        100% {opacity:1;}
    }
`;

export const TitleSizeOne = styled.h1`
    font-size: 38px;
    font-weight: 300;
    letter-spacing: 2px;
    float: left;

    @media only screen and (max-width: 992px) {
        float: none;
        text-align: center;
    }
`;

export const TitleSizeThree = styled.h3`
    text-align: center;
    letter-spacing: 2px;
    font-size: 30px;
`;

export const Form = styled.form<{
    display?: string
    flexDirection?: string
    textAlign?: string
}>`
    display: ${p => p.display};
    flex-direction: ${p => p.flexDirection};
    text-align: ${p => p.textAlign};
    padding: 70px 0;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

export const InputLabel = styled.label`
    padding-left: 5px;
    padding-right: 10px;
    padding-top: 10px;
    font-size: 24px;
`;

export const InputText = styled.input`
    border: none;
    border-bottom: 1px solid #171212;
    background-color: transparent;
    font-size: 24px;
    &:focus {
      outline: none;
    }
`;

export const Button = styled.button<{
    margin?: string
    width?: string
}>`
    background: transparent;
    border: 1px solid #171212;
    margin-top: 20px;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.1s ease-in;
    margin: ${p => p.margin};
    width: ${p => p.width};

    &:hover {
      background: #171212;
      color: #ffffff;
      fill: #ffffff;
      stroke: #ffffff;
    }

    @media only screen and (max-width: 411px) {
      margin-top: 5px;
      width: 50%;
      border: none;
    }
`;

export const Alert = styled.h4<{
    backgroundColor: string
}>`
    background-color: ${p => p.backgroundColor};
    text-align: center;
    padding: 10px;
    color: white;
    border: 3px solid #171212;
`;

export const Hr = styled.hr`
    border: 1px solid #171212;
    opacity: 0.5;
`;

export const Span = styled.span<{
    textAlign?: string
    fontWeight?: string
}>`
    text-align: ${p => p.textAlign};
    font-weight: ${p => p.fontWeight};
`;

export const P = styled.p`
    text-align: center;
`;

export const TableDiv = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    margin-top:10px;
`;

export const TableItem = styled.div`
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    a {
      color: inherite;
    }
`;

export const A = styled(Link)`
    text-decoration: none;
    color: #171212;
`;

export const Row = styled.div`
    padding-top: 2px;
    &:hover {
      background-color: #171212;
      color:white;
    }
`;

export const Nav = styled.div`
    background-color: transparent;
    padding: 10px;
    transition: 1s;
`;

export const Ul = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: inherit;
`;

export const Li = styled.li`
    float: right;
    display: block;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 18px;
    
    @media only screen and (max-width: 992px) {
        float: none;
    }
`;
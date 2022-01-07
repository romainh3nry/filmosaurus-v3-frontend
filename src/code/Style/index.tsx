import styled from 'styled-components'

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

export const TitleSizeThree = styled.h3`
    text-align: center;
    letter-spacing: 2px;
    font-size: 30px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
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

export const Button = styled.button`
    background: transparent;
    border: 1px solid #171212;
    margin-top: 20px;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.1s ease-in;

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

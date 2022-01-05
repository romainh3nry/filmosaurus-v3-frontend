import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useRef, useEffect, MutableRefObject} from 'react';

const StyledNav = styled.div `
    background-color: transparent;
    padding: 10px;
    transition: 1s;
`;

const StyledTitle = styled.h1 `
    font-size: 38px;
    font-weight: 300;
    letter-spacing: 2px;
    float: left;

    @media only screen and (max-width: 992px) {
        float: none;
        text-align: center;
    }
`;

const StyledList = styled.ul `
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: inherit;
`;

const StyledLi = styled.li `
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

const StyledA = styled.a `
    color: #171212;
`;

type HeaderProps = {
    title: string,
    isAthenticated: boolean
} 

export const Header = ({title, isAthenticated}: HeaderProps) => {

    const navRef = useRef() as MutableRefObject<HTMLInputElement>
    

    useEffect(() => {
        navRef.current.style.boxShadow = "5px 5px 10px #171212"
    })

    return (
        <StyledNav ref={navRef}>
            <StyledList>
                <StyledA href="/"><StyledTitle>{title}</StyledTitle></StyledA>
                {isAthenticated 
                    ? (
                        <>
                        <StyledLi><Link to="accounts/logout">Logout</Link></StyledLi>
                        <StyledLi><Link to="#">Account</Link></StyledLi>
                        </>
                    )
                    : (
                        <>
                        <StyledLi><Link to="accounts/register">Sign up</Link></StyledLi>
                        <StyledLi><Link to="accounts/login">Login</Link></StyledLi>
                        </>
                    )}
            </StyledList>
        </StyledNav>
    )
};
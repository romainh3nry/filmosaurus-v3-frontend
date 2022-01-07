import { useRef, useEffect, MutableRefObject} from 'react';
import { Nav, TitleSizeOne, Ul, Li, A} from '../Style';

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
        <Nav ref={navRef}>
            <Ul>
                <A to="/"><TitleSizeOne>{title}</TitleSizeOne></A>
                {isAthenticated 
                    ? (
                        <>
                        <Li><A to="accounts/logout">Logout</A></Li>
                        <Li><A to="account/">Account</A></Li>
                        </>
                    )
                    : (
                        <>
                        <Li><A to="accounts/register">Sign up</A></Li>
                        <Li><A to="accounts/login">Login</A></Li>
                        </>
                    )}
            </Ul>
        </Nav>
    )
};
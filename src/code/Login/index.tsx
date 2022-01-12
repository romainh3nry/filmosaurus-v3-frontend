import { Spinner } from '../Loader';
import axios from 'axios';
import { useNavigate } from 'react-router';
import React from 'react';
import { Container, Form, InputLabel, InputText, Button, Alert, TitleSizeThree } from '../Style';

type LoginForm = {
    username: string
    email: string
    password: string
}

type LoginInitAction = {
    type: 'LOGIN_INIT';
}

type LoginSucessAction = {
    type: 'LOGIN_SUCCESS';
    payload: string;
}

type LoginFailureAction = {
    type: 'LOGIN_FAILURE';
}

type LoginState = {
    data: string | undefined;
    isLoading:  boolean;
    isError: boolean;
}

type LoginAction =
    | LoginInitAction
    | LoginSucessAction
    | LoginFailureAction

type LoginProps = {
    getToken: React.Dispatch<React.SetStateAction<string | undefined>>
    API_BASE: string
}

const loginReducer = (state: LoginState, action: LoginAction) => {
    switch (action.type) {
        case 'LOGIN_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError : true
            }
        default:
            return state
    }
}

export const Login = ({getToken, API_BASE}: LoginProps) => {

    const navigate = useNavigate();
    const url = `${API_BASE}/dj-rest-auth/login/`;
    const [login, dispatchLogin] = React.useReducer(
        loginReducer,
        {data: undefined, isLoading: false, isError: false}
    )
    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = (e: any) => {
        handlePostLogin();
        e.preventDefault();
    }

    const handlePostLogin = () => {
        const data: LoginForm = {
            username: username,
            email: email,
            password: password,
        }
        dispatchLogin({type: 'LOGIN_INIT'})
        axios
            .post(url, data)
            .then(res => {
                dispatchLogin({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data
                })
                getToken(res.data.key)
                setSuccess(true)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            })
            .catch(e => {
                dispatchLogin({
                    type: 'LOGIN_FAILURE'
                })
            })
    }

    return (
        <Container width='60%' marginTop='30px' display='flex' flexDirection='column'>
            <TitleSizeThree fontSize='30px'>Login</TitleSizeThree>
            {login.isError && (
                <Alert backgroundColor='#BB4F37'>Oops ! Something went wrong...</Alert>
            )}
            {success && <Alert backgroundColor='#6EC170'>Successfully logged ! You're about to be redirected...</Alert>}
            <Form onSubmit={handleSubmit} display='flex' flexDirection='column'>
                <InputLabel>Username</InputLabel>
                <InputText
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    value={username}
                    name="username"
                />
                <InputLabel>Email</InputLabel>
                <InputText
                    type="email" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                />
                <InputLabel>Password</InputLabel>
                <InputText
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                />
                <Button border='1px solid #171212' type="submit">
                    {login.isLoading ? <Spinner height={40} /> : <>Login</>}
                </Button>
            </Form>
        </Container>
    )
};

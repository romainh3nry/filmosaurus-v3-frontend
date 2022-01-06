import React from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { Spinner } from '../Loader';
import { useNavigate } from 'react-router';
import { 
    Container,
    TitleSizeThree,
    Form,
    InputLabel,
    InputText,
    Button,
    Alert} from '../Style';

type RegisterForm = {
    username: string
    email: string
    password1: string
    password2: string
}

type RegisterProps = {
    API_BASE: string;
    getToken: React.Dispatch<React.SetStateAction<string | undefined>>
};

type RegisterInitAction = {
    type: 'REGISTER_INIT'
}

type RegisterSuccessAction = {
    type: 'REGISTER_SUCCESS'
    payload: string
}

type RegisterFailureAction = {
    type: 'REGISTER_FAILURE'
    payload: string
}

type RegisterState = {
    data: string | undefined
    isLoading: boolean
    isError: Boolean
}

type RegisterAction = 
    | RegisterInitAction
    | RegisterSuccessAction
    | RegisterFailureAction

const RegisterReducer = (state: RegisterState, action: RegisterAction) => {
    switch (action.type) {
        case 'REGISTER_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'REGISTER_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                payload: action.payload
            }
        default:
            return state
    }
}

export const Register = ({API_BASE, getToken}: RegisterProps) => {

    const navigate = useNavigate();
    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password1, setPassword1] = React.useState<string>("")
    const [password2, setPassword2] = React.useState<string>("")
    const [success, setSuccess] = React.useState(false);
    const [register, dispatchReducer] = React.useReducer(
        RegisterReducer,
        {data: undefined, isLoading: false, isError: false}
    )

    const url: string = `${API_BASE}/dj-rest-auth/registration/`

    const handlePostRegister = (data: RegisterForm) => {
        dispatchReducer({type: 'REGISTER_INIT'})
        axios
            .post(url, data)
            .then(res => {
                dispatchReducer(
                    {
                        type: 'REGISTER_SUCCESS',
                        payload: res.data
                    }
                )
                getToken(res.data.key)
                setSuccess(true)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            })
            .catch(e => {
                dispatchReducer({
                    type: 'REGISTER_FAILURE',
                    payload: e.response
                })
            })
    }

    const handleSubmit = (e: any) => {
        const data: RegisterForm = {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }
        handlePostRegister(data)
        e.preventDefault();
    };

    return (
        <Container display='flex' marginTop='30px' flexDirection='column' width='60%'>
            <TitleSizeThree>Register</TitleSizeThree>
            {register.isError && (
                <Alert backgroundColor='#BB4F37'>Oops ! Something went wrong...</Alert>
            )}
            {success && <Alert backgroundColor='#6EC170'>Successfully registered ! You're about to be redirected...</Alert>}
            <Form onSubmit={handleSubmit}>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword1(e.target.value)}
                    value={password1}
                    name="password1"
                />
                <InputLabel>Repeat password</InputLabel>
                <InputText
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
                    value={password2}
                    name="password2"
                />
                <Button type="submit">
                    {register.isLoading ? <Spinner height={40} /> : <>Register</>}
                </Button>
            </Form>
        </Container>
    )
};
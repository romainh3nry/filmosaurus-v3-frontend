import styled from 'styled-components'
import { Spinner } from '../Loader';
import axios from 'axios';
import { useNavigate } from 'react-router';
import React from 'react';

const StyledContainer = styled.div`
    margin: auto;
    width: 60%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    h3 {
        text-align: center;
        letter-spacing: 2px;
        font-size: 30px;
    }
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 70px 0;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

const StyledLabel = styled.label `
  padding-left: 5px;
  padding-right: 10px;
  padding-top: 10px;
  font-size: 24px;

`;

const StyledInput = styled.input `
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button `
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

const StyledErrorAlert = styled.h4`
    background-color: #BB4F37;
    text-align: center;
    padding: 10px;
    color: white;
    border: 3px solid #171212;
`;

const StyledSuccessAlert = styled.h4`
    background-color: #6EC170;
    text-align: center;
    padding: 10px;
    color: white;
    border: 3px solid #171212;
`;

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
        <StyledContainer>
            <h3>Login</h3>
            {login.isError && (
                <StyledErrorAlert>Oops ! Something went wrong...</StyledErrorAlert>
            )}
            {success && <StyledSuccessAlert>Successfully logged ! You're about to be redirected...</StyledSuccessAlert>}
            <StyledForm onSubmit={handleSubmit}>
                <StyledLabel>Username</StyledLabel>
                <StyledInput
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    value={username}
                    name="username"
                />
                <StyledLabel>Email</StyledLabel>
                <StyledInput
                    type="email" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                />
                <StyledLabel>Password</StyledLabel>
                <StyledInput
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                />
                <StyledButton type="submit">
                    {login.isLoading ? <Spinner height={40} /> : <>Login</>}
                </StyledButton>
            </StyledForm>
        </StyledContainer>
    )
};

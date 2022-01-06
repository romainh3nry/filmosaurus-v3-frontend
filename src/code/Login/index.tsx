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

    const url = `${API_BASE}/dj-rest-auth/login/`;
    const [login, dispatchLogin] = React.useReducer(
        loginReducer,
        {data: undefined, isLoading: false, isError: false}
    )
    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")

    const handleSubmit = () => {
        console.log('submitted');
    }

    const handlePostLogin = () => {
        console.log('login');
    }

    return (
        <StyledContainer>
            <h3>Login</h3>
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
                    name="password1"
                />
                <StyledButton type="submit">
                    {login.isLoading ? <Spinner height={40} /> : <>Login</>}
                </StyledButton>
            </StyledForm>
        </StyledContainer>
    )
};

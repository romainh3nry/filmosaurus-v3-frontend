import styled from 'styled-components'
import { Spinner } from '../Loader';
import axios from 'axios';
import { useNavigate } from 'react-router';

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
    return (
        <div>Login</div>
    )
};

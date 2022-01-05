import React from 'react';
import styled from 'styled-components'
import axios from 'axios';

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

export const Register = ({API_BASE, getToken}: RegisterProps) => {

    const [username, setUsername] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password1, setPassword1] = React.useState<string>("")
    const [password2, setPassword2] = React.useState<string>("")

    const url: string = `${API_BASE}/dj-rest-auth/registration/`

    const handlePostRegister = (data: RegisterForm) => {
        axios
            .post(url, data)
            .then(res => {
                getToken(res.data.key)
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
        <StyledContainer>
            <h3>Register</h3>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword1(e.target.value)}
                    value={password1}
                    name="password1"
                />
                <StyledLabel>Repeat password</StyledLabel>
                <StyledInput
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
                    value={password2}
                    name="password2"
                />
                <StyledButton type="submit">Register</StyledButton>
            </StyledForm>
        </StyledContainer>
    )
};
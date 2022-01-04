import styled from 'styled-components'

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

const StyledForm = styled.div`
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

export const Register = () => {
    return (
        <StyledContainer>
            <h3>Register</h3>
            <StyledForm>
                <StyledLabel>Username</StyledLabel>
                <StyledInput type="text" />
                <StyledLabel>Email</StyledLabel>
                <StyledInput type="email" />
                <StyledLabel>Password</StyledLabel>
                <StyledInput type="password" />
                <StyledLabel>Repeat password</StyledLabel>
                <StyledInput type="password" />
                <StyledButton type="button">Register</StyledButton>
            </StyledForm>
        </StyledContainer>
    )
};
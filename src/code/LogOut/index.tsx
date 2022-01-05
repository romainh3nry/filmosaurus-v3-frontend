import styled from 'styled-components';

const StyledContainer = styled.div`
    margin: auto;
    width: 60%;
    text-align: center;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
`;

const StyledButtonDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button `
  background: transparent;
  border: 1px solid #171212;
  margin: 10px;
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

export const LogOut = () => {
    return (
        <StyledContainer>
            <h3>Are you sure you want to logout ? </h3>
            <StyledButtonDiv>
                <StyledButton>Confirm</StyledButton>
                <StyledButton>Cancel</StyledButton>
            </StyledButtonDiv>
        </StyledContainer>
    )
};
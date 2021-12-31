import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #171212;
  margin: 10px;
  padding: 5px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  width: 15%;
  &:hover {
    background: #171212;
    color: #ffffff;
    fill: #ffffff;
    stroke: #ffffff;
  }
`;

type PaginationButtonProps = {
    move: React.MouseEventHandler<HTMLButtonElement>,
    text: string
}

export const PaginationButton = ({move, text}: PaginationButtonProps) => {
    return (
      <StyledButton 
        type="button"
        onClick={move}
      >
        {text}
      </StyledButton>
    )
}

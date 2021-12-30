import React from 'react';
import styled from 'styled-components'

const StyledForm = styled.form `
    padding: 70px 0;
    text-align: center;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

const StyledButton = styled.button `
  background: transparent;
  border: 1px solid #171212;
  padding: 18px;
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

const StyledLabel = styled.label `
  padding-left: 5px;
  padding-right: 10px;
  font-size: 24px;
`;

const StyledInput = styled.input `
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
  width: 300px;
  &:focus {
    outline: none;
  }
`;

type SearchFormProps = {
    label: string,
    searchTerm: string,
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
};

export const SearchForm = ({label, searchTerm, onChange, onSubmit,}: SearchFormProps) => {
    return (
        <StyledForm onSubmit={onSubmit}>
            <StyledLabel>{label}</StyledLabel>
            <StyledInput type="text" value={searchTerm} onChange={onChange}/>
            <StyledButton type="submit">Search</StyledButton>
        </StyledForm>
    )
};

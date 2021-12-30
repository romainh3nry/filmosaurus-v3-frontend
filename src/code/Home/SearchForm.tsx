import React from 'react';
import styled from 'styled-components'

const StyledForm = styled.form `
    padding: 70px 0;
    text-align: center;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

type SearchFormProps = {
    label: string,
    searchTerm: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchForm = ({label, searchTerm, onChange, onSubmit}: SearchFormProps) => {
    return (
        <StyledForm>
            <label>Search: </label>
            <input type="text" />
            <button type="button">Search</button>
        </StyledForm>
    )
}
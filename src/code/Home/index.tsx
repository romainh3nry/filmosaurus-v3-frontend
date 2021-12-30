import styled from 'styled-components'
import React from "react";

const StyledForm = styled.form `
    padding: 70px 0;
    text-align: center;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

export const Home = () => {
    return (
        <>
        <StyledForm>
            <label>Search: </label>
            <input type="text" />
        </StyledForm>
        </>
    )
};
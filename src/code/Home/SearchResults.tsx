import React from "react";
import {Item} from "./Item"
import styled from 'styled-components';
import { Link } from "react-router-dom";

const StyledA = styled(Link)`
  text-decoration: none;
  color: #171212;
`;

const StyledRow = styled.div `
  padding-top: 2px;
  &:hover {
    background-color: #171212;
    color:white;
  }
`;

type SearchResultsProps = {
    list: {
        id: number,
        title: string,
        year: number,
        directors: string[]
    }[]
}

export const SearchResults = React.memo<any>(({list}: SearchResultsProps) => {
    return list.map(item => {
        return (
            <StyledA key={item.id} to={`movies/${item.id}`}>
                <StyledRow>
                    <Item item={item} />
                </StyledRow>
            </StyledA>
        )
    })
});
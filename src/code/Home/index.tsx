import styled from 'styled-components'
import React from "react";
import { SearchForm } from './SearchForm';

export const Home = () => {
    return (
       <SearchForm 
        label={"search"}
        searchTerm={"value"}
        onChange={e => console.log(e.target.value)}
        onSubmit={e => console.log('submitted')}
       />
    )
};
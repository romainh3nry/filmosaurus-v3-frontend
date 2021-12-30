import styled from 'styled-components'
import React from "react";
import { SearchForm } from './SearchForm';


export const Home = () => {

    const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined)

    return (
       <SearchForm 
        label={"search"}
        searchTerm={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onSubmit={e => console.log('submitted')}
       />
    )
};
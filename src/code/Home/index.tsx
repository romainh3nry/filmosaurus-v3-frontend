import React from "react";
import { SearchForm } from './SearchForm';
import axios from 'axios';
import {Spinner} from "../Loader"
import {SearchResults} from "./SearchResults"
import styled from 'styled-components';

const StyledContainer = styled.div`
    margin-top: 20px;
    margin: auto;
    width: 50%;

    @media only screen and (max-width: 1080px) {
        width: 90%;
        font-size: 15px;
    }
    @media only screen and (min-width: 1080px) {
        width: 90%;
        font-size: 18px;
    }
`;

const StyledHr = styled.hr`
    border: 1px solid #171212;
    opacity: 0.5;
`;

const StyledCenterSpan = styled.span`
    text-align:center;
`;

const StyledBoldSpan = styled.span`
    font-weight: bold;
`;

type HomeProps = {
    API_BASE: string
}

type Movie = {
    id: number,
    title: string,
    year: number,
    directors: string[],
}

type Movies = Movie[]

type SearchFetchInitAction = {
    type: 'SEARCH_FETCH_INIT';
}

type SearchFetchSuccessAction = {
    type: 'SEARCH_FETCH_SUCCESS';
    payload: {list: Movies, count: number}
}

type SearchFetchFailureAction = {
    type: 'SEARCH_FETCH_FAILURE';
}

type SearchState = {
    data: Movies,
    isLoading: boolean,
    isError: boolean,
    count: number
}

type SearchAction = 
    | SearchFetchInitAction
    | SearchFetchSuccessAction
    | SearchFetchFailureAction

const searchReducer = (state: SearchState, action: SearchAction) => {
    switch (action.type) {
        case 'SEARCH_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
                data: []
            }
        case 'SEARCH_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.list,
                count: action.payload.count
            }
        case 'SEARCH_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

export const Home = ({API_BASE}:HomeProps) => {

    const API_SEARCH: string = '/search';
    const PARAM_SEARCH: string = 'query=';
    const PARAM_PAGE: string = 'page=';
    const getUrl = (searchTerm: string, page: number):string => {
        return `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
    }

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [urls, setUrls] = React.useState<string | undefined>(undefined)
    const [currentSearch, setCurrentSearch] = React.useState<string | undefined>(undefined)
    const [search, dispatchSearch] = React.useReducer(
        searchReducer,
        {data: [], count: 0, isLoading: false, isError: false}
    )

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        handleSearch(searchTerm, 1)
        event.preventDefault();
    }

    const handleSearch = (searchTerm: string, page: number) => {
        const url = getUrl(searchTerm, page);
        setUrls(url);
    }

    const handleFetchSearch = React.useCallback(() => {
        if (!searchTerm) return;
        if (urls !== undefined ) {
            setCurrentSearch(searchTerm)
            dispatchSearch({type: 'SEARCH_FETCH_INIT'})
            axios
                .get(urls)
                .then(results => {
                    dispatchSearch({
                        type: 'SEARCH_FETCH_SUCCESS',
                        payload: {
                            list: results.data.results,
                            count: results.data.count
                        }
                    })
                })
                .catch(() => {
                    dispatchSearch({type: 'SEARCH_FETCH_FAILURE'})
                })
        }
    }, [urls])

    React.useEffect(() => {
        handleFetchSearch()
    }, [handleFetchSearch])

    return (
        <>
       <SearchForm 
         label={"search"}
         searchTerm={searchTerm}
         onChange={e => setSearchTerm(e.target.value)}
         onSubmit={handleSubmit}
       />
       <StyledContainer>
       {search.data.length > 0 && (
           <>
           <span>{search.count} results for <StyledBoldSpan>{currentSearch}</StyledBoldSpan></span>
           <StyledHr />
           <SearchResults list={search.data} />
           </>
       )}
       {search.isLoading && (
           <StyledCenterSpan><Spinner /></StyledCenterSpan>
       )}
       {search.isError && (
           <StyledCenterSpan>Something went wrong...</StyledCenterSpan>
       )}
       </StyledContainer>
       </>
    )
};

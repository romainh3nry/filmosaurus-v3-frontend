import React from "react";
import { SearchForm } from './SearchForm';
import axios from 'axios';
import {Spinner} from "../Loader"

type HomeProps = {
    API_BASE: string
}

type Movie = {
    id:number,
    title: string,
    year: number,
    directors: string[]
}

type Movies = Movie[]

type SearchState = {
    data: Movies,
    isLoading: boolean,
    isError: boolean
}

type SearchAction = {
    type: 'SEARCH_FETCH_INIT' | 'SEARCH_FETCH_SUCCESS' | 'SEARCH_FETCH_FAILURE',
    payload?: any
}

const searchReducer = (state: SearchState, action: SearchAction) => {
    switch (action.type) {
        case 'SEARCH_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'SEARCH_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.results
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
    const [search, dispatchSearch] = React.useReducer(
        searchReducer,
        {data: [], isLoading: false, isError: false}
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
            dispatchSearch({type: 'SEARCH_FETCH_INIT'})
            axios
                .get(urls)
                .then(results => {
                    dispatchSearch({
                        type: 'SEARCH_FETCH_SUCCESS',
                        payload: results.data
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
       </>
    )
};

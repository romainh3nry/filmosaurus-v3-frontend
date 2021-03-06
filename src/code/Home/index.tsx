import React from "react";
import { SearchForm } from './SearchForm';
import axios from 'axios';
import {Spinner} from "../Loader"
import {SearchResults} from "./SearchResults"
import {PaginationButton} from "./PaginationButton"
import { Container, Hr, Span, P } from "../Style";

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
    payload: {
        list: Movies,
        count: number,
        next: string | null,
        previous: string | null
    }
}

type SearchFetchFailureAction = {
    type: 'SEARCH_FETCH_FAILURE';
}

type SearchState = {
    data: Movies,
    isLoading: boolean,
    isError: boolean,
    count: number,
    next: string | null,
    previous: string | null
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
                count: action.payload.count,
                next: action.payload.next,
                previous: action.payload.previous
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
    const [urls, setUrls] = React.useState<string>("")
    const [currentSearch, setCurrentSearch] = React.useState<string | undefined>(undefined)
    const [search, dispatchSearch] = React.useReducer(
        searchReducer,
        {data: [], count: 0, next: null, previous: null, isLoading: false, isError: false}
    )

    const extractSearchTerm = (url: string) => {
        return url
          .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
          .replace(PARAM_SEARCH, '');
    }

    const extractPage = (url: string) => {
        const page = url.split('=')
        return parseInt(page[page.length - 1])
    }

    const handleNext = () => {
        const searchTerm = extractSearchTerm(urls);
        const page = extractPage(urls)
        handleSearch(searchTerm, page + 1);
    }
  
      const handlePrevious = () => {
        const searchTerm = extractSearchTerm(urls);
        const page = extractPage(urls)
        handleSearch(searchTerm, page - 1);
    }

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
                            count: results.data.count,
                            next: results.data.next,
                            previous: results.data.previous
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
       <Container marginTop="20px" width="90%" animation="fadeIn 3s">
       {search.data.length > 0 && (
           <>
           <span>{search.count} results for <Span fontWeight="bold">{currentSearch}</Span></span>
           <Hr />
           <SearchResults list={search.data} />
           </>
       )}
       {search.isLoading && (
           <Span textAlign="center"><Spinner /></Span>
       )}
       {search.isError && (
           <Span textAlign="center">Something went wrong...</Span>
       )}
       <P>
            {search.previous !== null &&
              <PaginationButton move={handlePrevious} text="Previous" />
            }
            {search.next !== null &&
              <PaginationButton move={handleNext} text="Next" />
            }
        </P>
       </Container>
       </>
    )
};

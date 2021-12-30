import React from "react";
import { SearchForm } from './SearchForm';
import axios from 'axios';

type HomeProps = {
    API_BASE: string
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
        urls !== undefined && (
            axios
                .get(urls)
                .then(results => {
                    console.log(results);
                })
            )
    }, [urls])

    React.useEffect(() => {
        handleFetchSearch()
    }, [handleFetchSearch])

    return (
       <SearchForm 
         label={"search"}
         searchTerm={searchTerm}
         onChange={e => setSearchTerm(e.target.value)}
         onSubmit={handleSubmit}
       />
    )
};

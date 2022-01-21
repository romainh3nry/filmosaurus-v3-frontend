import React from "react";
import axios from 'axios';

type AccountProps = {
    API_BASE: string
    token: string
}

type Watchlist = {
    id: number
    movie_id: string
    title: string
    year: string
    seen: boolean
    viewed_date: string | null
    saved_date: string
}

type WatchListFetchInit = {
    type: 'WATCHLIST_INIT'
}

type WatchlistFetchSuccess = {
    type: 'WATCHLIST_SUCCESS'
    payload: Watchlist[]
}

type WatchlistFetchFailure = {
    type: 'WATCHLIST_FAILURE'
}

type WatchlistState = {
    data: Watchlist[]
    isLoading: boolean
    isError: boolean
}

type WatchlistAction = 
    | WatchListFetchInit
    | WatchlistFetchSuccess
    | WatchlistFetchFailure

const watchlistReducer = (state: WatchlistState, action: WatchlistAction) => {
    switch (action.type) {
        case 'WATCHLIST_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'WATCHLIST_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'WATCHLIST_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError : true
            }
        default:
            return state
    }
}

export const Account = ({API_BASE, token}: AccountProps) => {

    const [watchlist, dispatchWatchlist] = React.useReducer(
        watchlistReducer,
        {data: [], isLoading: false, isError: false}
    )

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const handleLoadWatchlist = React.useCallback(() => {
        dispatchWatchlist({type: 'WATCHLIST_INIT'})
        const url = `${API_BASE}/accounts/watchlist/list`;
        axios
            .get(url, {headers: headers})
            .then(res => {
                dispatchWatchlist({
                    type: 'WATCHLIST_SUCCESS',
                    payload: res.data
                })
            })
            .catch(() => {
                dispatchWatchlist({
                    type: 'WATCHLIST_FAILURE'
                })
            })
    }, [])

    React.useEffect(() => {
        handleLoadWatchlist()
    }, [handleLoadWatchlist])

    return (
        <div>Account</div>
    )
};
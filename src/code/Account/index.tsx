import React from "react";
import axios from 'axios';

type AccountProps = {
    API_BASE: string
    token: string
}

export const Account = ({API_BASE, token}: AccountProps) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const handleLoadWatchlist = React.useCallback(() => {
        const url = `${API_BASE}/accounts/watchlist/list`;
        axios
            .get(url, {headers: headers})
            .then(res => {
                console.log(res)
            })
    }, [])

    React.useEffect(() => {
        handleLoadWatchlist()
    }, [handleLoadWatchlist])

    return (
        <div>Account</div>
    )
};
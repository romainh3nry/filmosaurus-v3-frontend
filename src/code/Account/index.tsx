import React from "react";

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
        console.log('loaded');
    }, [])

    React.useEffect(() => {
        handleLoadWatchlist()
    }, [handleLoadWatchlist])

    return (
        <div>Account</div>
    )
};
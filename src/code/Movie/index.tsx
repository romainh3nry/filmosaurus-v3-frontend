import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

type ParamType = {
    movieId: string;
}

type MovieProps = {
    API_BASE: string
}

export const Movie = ({API_BASE}: MovieProps) => {

    let params = useParams<ParamType>();
    const url = `${API_BASE}/movie/${params.movieId}`
    console.log(url)

    const handleFetchMovie = React.useCallback(() => {
        axios
            .get(url)
            .then(results => {
                console.log(results)
            })
    }, [])

    React.useEffect(() => {
        handleFetchMovie()
    }, [handleFetchMovie])

    return (
        <div>Movie Detail : {params.movieId}</div>
    )
};

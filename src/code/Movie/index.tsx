import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

type ParamType = {
    movieId: string;
}

type MovieProps = {
    API_BASE: string
}

type MovieType = {
    id: number,
    title: string,
    year: number,
    plot: string,
    directors: string[],
    countries: string [],
    categories: string [],
    casts: string[]
}

type MovieFetchInitAction = {
    type: 'MOVIE_FETCH_INIT'
}

type MovieFetchSuccessAction = {
    type: 'MOVIE_FETCH_SUCCESS',
    payload: MovieType[]
}

type MovieFetchFailure = {
    type: 'MOVIE_FETCH_FAILURE'
}

type MovieState = {
    data: MovieType[],
    isLoading: boolean,
    isError: boolean
}

type MovieAction = 
    | MovieFetchInitAction
    | MovieFetchSuccessAction
    | MovieFetchFailure

const movieReducer = (state:MovieState, action:MovieAction) => {
    switch (action.type) {
        case 'MOVIE_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'MOVIE_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'MOVIE_FETCH_FAILURE':
            return {
                ...state,
                isLoading : false,
                isError: true
            }
        default:
            return state
    }
}

export const Movie = ({API_BASE}: MovieProps) => {

    let params = useParams<ParamType>();

    const [movieDetail, dispatchMovieDetail] = React.useReducer(
        movieReducer,
        {data: [], isLoading: false, isError: false}
    )
    const url = `${API_BASE}/movie/${params.movieId}`

    const handleFetchMovie = React.useCallback(() => {
        dispatchMovieDetail({type: 'MOVIE_FETCH_INIT'})
        axios
            .get(url)
            .then(results => {
                dispatchMovieDetail({
                    type: 'MOVIE_FETCH_SUCCESS',
                    payload: results.data
                })
            })
            .catch(() => {
                dispatchMovieDetail({type: 'MOVIE_FETCH_FAILURE'})
            })
    }, [])

    React.useEffect(() => {
        handleFetchMovie()
    }, [handleFetchMovie])

    return (
        <div>Movie Detail : {params.movieId}</div>
    )
};

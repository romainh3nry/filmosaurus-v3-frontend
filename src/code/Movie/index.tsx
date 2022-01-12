import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {Spinner} from "../Loader"
import { DetailMovie } from "./DetailMovie";
import { FlexDiv, CenterDiv, Col } from "../Style";

type ParamType = {
    movieId: string
}

type MovieProps = {
    API_BASE: string
    token: string | undefined
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
    payload: MovieType
}

type MovieFetchFailure = {
    type: 'MOVIE_FETCH_FAILURE'
}

type MovieState = {
    data: any,
    isLoading: boolean,
    isError: boolean
}

type MovieAction = 
    | MovieFetchInitAction
    | MovieFetchSuccessAction
    | MovieFetchFailure

type MovieRatings = {
    ratings: {}[]
}

export const movieReducer = (state:MovieState, action:MovieAction) => {
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

export const Movie = ({API_BASE, token}: MovieProps) => {

    let params = useParams<ParamType>();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }
    const urlFetchMovie = `${API_BASE}/movie/${params.movieId}`
    const [movieDetail, dispatchMovieDetail] = React.useReducer(
        movieReducer,
        {data: {}, isLoading: false, isError: false}
    )
    const [image, setImage] = React.useState<undefined | string>(undefined)
    const [ratings, setRatings] = React.useState<MovieRatings | undefined>(undefined)
    const [isAddedToWatchlist, setIsAddedToWatchlist] = React.useState<boolean>(false)

    const handleFetchMovie = React.useCallback(() => {
        dispatchMovieDetail({type: 'MOVIE_FETCH_INIT'})
        axios
            .get(urlFetchMovie)
            .then(result => {
                dispatchMovieDetail({
                    type: 'MOVIE_FETCH_SUCCESS',
                    payload: result.data
                })
            })
            .catch(() => {
                dispatchMovieDetail({type: 'MOVIE_FETCH_FAILURE'})
            })
    }, [movieDetail])

    const handleFetchImage = (title:string, year:number) => {
        const urlFetchImage = `${API_BASE}/image/get?movie=${title}&year=${year}`
        movieDetail.data.title  &&
        axios
            .get(urlFetchImage)
            .then(result => {
                setImage(result.data.image)
            })
            .catch(() => {
                setImage('error')
            })
    }

    const handleFetchRatings = (title:string, year:number) => {
        const urlFetchRates = `${API_BASE}/ratings/load?movie=${title}&year=${year}`
        movieDetail.data.title  &&
        axios
            .get(urlFetchRates)
            .then(result => {
                setRatings(result.data);
            })
    }

    const handleClick = () => {
        const urlViewed = `${API_BASE}/accounts/watchlist/add`; 
        const data = {
            "movie_id": params.movieId
        }
        axios
            .post(urlViewed, data, {headers: headers})
            .then(res => {
                setIsAddedToWatchlist(true)
            })
    }

    const isMovieInWatchlist = React.useCallback(() => {
        if (token !== undefined) {
            const urlCheck = `${API_BASE}/accounts/watchlist/movie/check?movie_id=${params.movieId}`
            axios
                .get(urlCheck, {headers: headers})
                .then(res => {
                    res.data.saved
                        ? setIsAddedToWatchlist(true)
                        : setIsAddedToWatchlist(false)
                })
        }
    }, [])

    React.useEffect(() => {
        handleFetchMovie()
    }, [])

    React.useEffect(() => {
        handleFetchImage(movieDetail.data.title, movieDetail.data.year)
    }, [movieDetail.data])

    React.useEffect(() => {
        handleFetchRatings(movieDetail.data.title, movieDetail.data.year)
    }, [movieDetail.data])

    React.useEffect(() => {
        isMovieInWatchlist()
    }, [isMovieInWatchlist])

    return (
        <FlexDiv>
            {movieDetail.isError && <span>Something went wrong...</span>}
            {movieDetail.isLoading
                ? (<CenterDiv height="500px"><Spinner /></CenterDiv>)
                : (
                    <Col>
                        {Object.keys(movieDetail.data).length > 0 && (
                            <DetailMovie
                                handleClick={handleClick}
                                image={image}
                                movie={movieDetail.data}
                                ratings={ratings?.ratings} 
                                isAddedToWatchList={isAddedToWatchlist}
                                isAuthenticated={token}
                            />
                        )}
                    </Col>
                )}
        </FlexDiv>
    )
};

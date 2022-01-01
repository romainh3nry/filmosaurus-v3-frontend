import React from 'react';
import styled from 'styled-components';
import {movieReducer} from "./index"

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;

    @media only screen and (max-width: 992px) {
        flex-direction: column;
        width: 100%;
    }
`;

const StyledImageDiv = styled.div`
    display:flex; 
    flex-direction: column;

    @media only screen and (max-width: 992px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`;

const StyledInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    height: 80%;
`;

const StyledInfoTitle = styled.h3`
`;

const StyledItemSpan = styled.span`
    text-decoration: underline;
    padding: 5px;
    margin: 5px;

    &:hover {
        color: red;
    }
`;

const StyledDivider = styled.div`
    padding: 10px;

    hr {
        border: 1px solid #171212;
        opacity: 0.2;
    }
`;

type DetailMovieProps = {
    image: string | undefined
    movie: {
        id: number,
        title: string,
        year: number,
        plot: string,
        directors: string[],
        countries: string [],
        categories: string [],
        casts: string[]
    }
}

export const DetailMovie = ({image, movie}: DetailMovieProps) => {

    const [movieDetail, dispatchMovieDetail] = React.useReducer(
        movieReducer,
        {data: {}, isLoading: false, isError: false}
    )

    return (
        <StyledContainer>
            <StyledImageDiv>
                <img src={image} height="auto" width="500" />
            </StyledImageDiv>
            <StyledInfoDiv>
                <h2>{movie.title} ({movie.year})</h2>
                <StyledInfoTitle>Directors</StyledInfoTitle>
                <div>{movie.directors.map((item, i) => <span key={i}><StyledItemSpan>{item}</StyledItemSpan> </span>)}</div>
                <StyledInfoTitle>Countries</StyledInfoTitle>
                <div>{movie.countries.map((item, i) => <span key={i}><StyledItemSpan>{item}</StyledItemSpan> </span>)}</div>
                <StyledInfoTitle>Categories</StyledInfoTitle>
                <div>{movie.categories.map((item, i) => <span key={i}><StyledItemSpan>{item}</StyledItemSpan> </span>)}</div>
                <StyledInfoTitle>Casting</StyledInfoTitle>
                <div>{movie.casts.map((item, i) => <span key={i}><StyledItemSpan>{item}</StyledItemSpan> </span>)}</div>
                <StyledInfoTitle>Plot</StyledInfoTitle>
                <div>{movie.plot}</div>
                <StyledDivider><hr /></StyledDivider>
            </StyledInfoDiv>
        </StyledContainer>
    )
};
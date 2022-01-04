import { cp } from 'fs/promises';
import styled from 'styled-components';
import {Spinner} from "../Loader"

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

const StyledCenteredSpinner = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const StyledRatesBlock = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledRateColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledRateIcon = styled.div`
    font-size: 50px;
    padding: 15px;
    margin-left: 50px;
    margin-right: 50px;

    a {
        color: #171212;
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
    ratings: any
}

export const DetailMovie = ({image, movie, ratings}: DetailMovieProps) => {
    console.log(ratings)
    return (
        <StyledContainer>
            <StyledImageDiv>
                {image 
                    ? (<img src={image} height="auto" width="500" />)
                    : (<StyledCenteredSpinner><Spinner /></StyledCenteredSpinner>)}
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
                <StyledRatesBlock>
                {ratings 
                    ? (
                        <>
                        <StyledRateColumn>
                        <StyledRateIcon>
                            <a href={`https://www.allocine.fr/film/fichefilm_gen_cfilm=${ratings[0].allocine.id}.html`} target="_blank">
                                <span className="iconify" data-icon="cib:allocine"></span>
                            </a>
                        </StyledRateIcon>
                        <div>Press: {ratings && (ratings[0].allocine.press)}</div>
                        <div>Spectators: {ratings && (ratings[0].allocine.spectator)}</div>
                        </StyledRateColumn>
                        <StyledRateColumn>
                            <StyledRateIcon>
                                <a target="_blank" href={`https://www.imdb.com/title/${ratings[1].id}/`}>
                                    <i className="fab fa-imdb"></i>
                                </a>
                            </StyledRateIcon>
                            <div>{ratings && (ratings[1].imdb)}</div>
                        </StyledRateColumn>
                        </>
                    )
                    : (<StyledCenteredSpinner><Spinner /></StyledCenteredSpinner>)}    
                </StyledRatesBlock>
            </StyledInfoDiv>
        </StyledContainer>
    )
};
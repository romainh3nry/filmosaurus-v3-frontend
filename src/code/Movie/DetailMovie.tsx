import styled from 'styled-components';

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
`;

const StyledInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledInfoTitle = styled.h3`
    text-decoration: underline;
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
    console.log(movie)
    return (
        <StyledContainer>
            <StyledImageDiv>
                <img src={image} height="auto" width="500" />
            </StyledImageDiv>
            <StyledInfoDiv>
                <h2>{movie.title} ({movie.year})</h2>
                <StyledInfoTitle>Directors</StyledInfoTitle>
                <div>{movie.directors}</div>
                <StyledInfoTitle>Countries</StyledInfoTitle>
                <div>{movie.countries.map((item, i) => <span key={i}>{item + " - "}</span>)}</div>
                <StyledInfoTitle>Categories</StyledInfoTitle>
                <div>{movie.categories.map((item, i) => <span key={i}>{item + " - "}</span>)}</div>
                <StyledInfoTitle>Casting</StyledInfoTitle>
                <div>{movie.casts.map((item, i) => <span key={i}>{item + " - "}</span>)}</div>
                <StyledInfoTitle>Plot</StyledInfoTitle>
                <div>{movie.plot}</div>
            </StyledInfoDiv>
        </StyledContainer>
    )
};
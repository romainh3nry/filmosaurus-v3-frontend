import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
`;

const StyledImageDiv = styled.div`
    display:flex; 
    flex-direction: column;
`;

const StyledInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

type DetailMovieProps = {
    image: string | undefined
    item: {
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

export const DetailMovie = ({image, item}: DetailMovieProps) => {
    return (
        <StyledContainer>
            <StyledImageDiv>
                <img src={image} height="auto" width="500" />
            </StyledImageDiv>
            <StyledInfoDiv>
                <h2>{item.title} ({item.year})</h2>
                <div>Directed by {item.directors}</div>
                <div>{item.countries.map((item, i) => <span key={i}>{item + " - "}</span>)}</div>
                <div>{item.categories.map((item, i) => <span key={i}>{item + " - "}</span>)}</div>
                <div>{item.casts.map((item, i) => <span key={i}>{item + " - "}</span>)}</div>
                <div>{item.plot}</div>
            </StyledInfoDiv>
        </StyledContainer>
    )
};
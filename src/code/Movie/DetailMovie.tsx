import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
`;

const StyledImageDiv = styled.div`
    border: 1px solid #171212;
`;

type DetailMovieProps = {
    image: string | undefined
}

export const DetailMovie = ({image}: DetailMovieProps) => {
    return (
        <StyledContainer>
            <img src={image} height="auto" width="500" />
        </StyledContainer>
    )
};
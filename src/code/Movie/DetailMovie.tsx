import {Spinner} from "../Loader"
import { Container, Col, TitleSizeThree, Item, Hr, CenterDiv, Icon, Button } from '../Style';

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
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

export const DetailMovie = ({image, movie, ratings, handleClick}: DetailMovieProps) => {
    console.log(ratings)
    return (
        <Container
            display='flex'
            justifyContent='center'
            textAlign='center'
            respFlexDirection='column'
            respWidth='100%'
        >
            <Col>
                {image 
                    ? (<img src={image} height="auto" width="500" />)
                    : (<CenterDiv><Spinner /></CenterDiv>)
                }
                <Button>Save</Button>
            </Col>
            <Col height='80%'>
                <h2>{movie.title} ({movie.year})</h2>
                <TitleSizeThree fontSize='17px'>Directors</TitleSizeThree>
                <div>{movie.directors.map((item, i) => <span key={i}><Item>{item}</Item> </span>)}</div>
                <TitleSizeThree fontSize='17px'>Countries</TitleSizeThree>
                <div>{movie.countries.map((item, i) => <span key={i}><Item>{item}</Item> </span>)}</div>
                <TitleSizeThree fontSize='17px'>Categories</TitleSizeThree>
                <div>{movie.categories.map((item, i) => <span key={i}><Item>{item}</Item> </span>)}</div>
                <TitleSizeThree fontSize='17px'>Casting</TitleSizeThree>
                <div>{movie.casts.map((item, i) => <span key={i}><Item>{item}</Item> </span>)}</div>
                <TitleSizeThree fontSize='17px'>Plot</TitleSizeThree>
                <div>{movie.plot}</div>
                <div><Hr /></div>
                <CenterDiv>
                {ratings 
                    ? (
                        <>
                        <Col>
                        <Icon>
                            <a href={`https://www.allocine.fr/film/fichefilm_gen_cfilm=${ratings[0].allocine.id}.html`} target="_blank">
                                <span className="iconify" data-icon="cib:allocine"></span>
                            </a>
                        </Icon>
                        <div>Press: {ratings && (ratings[0].allocine.press)}</div>
                        <div>Spectators: {ratings && (ratings[0].allocine.spectator)}</div>
                        </Col>
                        <Col>
                            <Icon>
                                <a target="_blank" href={`https://www.imdb.com/title/${ratings[1].id}/`}>
                                    <i className="fab fa-imdb"></i>
                                </a>
                            </Icon>
                            <div>{ratings && (ratings[1].imdb)}</div>
                        </Col>
                        </>
                    )
                    : (<CenterDiv><Spinner /></CenterDiv>)}    
                </CenterDiv>
            </Col>
        </Container>
    )
};
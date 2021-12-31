import { useParams } from "react-router-dom";

type ParamType = {
    movieId: string;
}

export const Movie = () => {
    let params = useParams<ParamType>();
    return (
        <div>Movie Detail : {params.movieId}</div>
    )
};

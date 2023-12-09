import { useContext } from "react";
import MovieCard from "./MovieCard";
import { Context } from "../../main";
const MovieGrid = () => {
    const state = useContext(Context);
    const movies = state.data;
    return (
        <div className="grid grid-cols-4">
            {Array.isArray(movies.value) ?
                (movies.value.map((movie, i) => (
                    <MovieCard
                        title={movie.movieTitle}
                        desc={movie.movieDescription}
                        image={movie.image}
                        key={movie.movieTitle}
                    />
                )))
                : (
                    <div>
                        <h2>Wait</h2>
                    </div >
                )}
        </div >
    )
}
export default MovieGrid;   
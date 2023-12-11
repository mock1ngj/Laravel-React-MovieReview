import ReactDOM from 'react-dom/client'
import '../css/app.css'
import Navbar from './component/Navbar'
import MovieGrid from './component/MovieGrid/MovieGrid'
import MovieCard from './component/MovieGrid/MovieCard'
import { Context, movieReviewState } from './main'
import { signal } from '@preact/signals-react'
import axios from 'axios'
import('preline')

const isLoggedIn = signal({});
const state = movieReviewState();

axios.post('/user').then((res) => {
    isLoggedIn.value = res.data;
});

const showToast = signal(false);

const Home = () => {
    return (
        <Context.Provider value={state}>
            <Navbar loggedIn={isLoggedIn} />
            {state.content.value == 'home' ?
                (<MovieGrid />) :
                (<MovieCard id={state.movie.value.id} title={state.movie.value.movieTitle} desc={state.movie.value.movieDescription} loggedIn={isLoggedIn.value} image={state.movie.value.image} />)}
        </Context.Provider>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Home />
)
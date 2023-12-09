import axios from "axios"
import { createContext } from "react";
import { batch, effect, signal } from "@preact/signals-react";

export function adminState() {
    const data = signal();
    const action = signal('update');
    const movie = signal({ movieTitle: '', movieDescription: '' });

    effect(() => {
        if (action.value == 'update') {
            axios.get('/movies').then((res) => {
                batch(() => {
                    action.value = 'loaded';
                    data.value = res.data;
                })
            });
        }
    });

    return { data, movie, action }
}

export function movieReviewState() {

    const data = signal();
    const content = signal('home');
    const movie = signal();
    const reviews = signal();
    const update = signal(true);

    axios.get('/movies').then((response) => {
        data.value = response.data;
    });
    axios.get('/reviews').then((response) => {
        reviews.value = response.data;
    });

    /*     effect(() => {
            post('loadMovieList').then((res) => {
                data.value = res;
                updateMovie.value = false;
            });
        })
    
        effect(() => {
            if (update.value) {
                post('loadUserReviews').then((res) => {
                    console.log('update');
                    reviews.value = res;
                    update.value = false;
                })
            }
        }) */
    return { data, content, movie, reviews, update }
}

export const Context = createContext();

export const LoginContext = createContext();
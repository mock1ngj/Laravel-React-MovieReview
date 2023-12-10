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
    const alert = signal({ show: false, message:null});

    axios.get('/movies').then((response) => {
        data.value = response.data;
    });

    effect(() => {
        if (update.value) {
            axios.get('/reviews').then((response) => {
                reviews.value = response.data;
                update.value = false;
            });
        }
    });

    return { data, content, movie, reviews, update, alert}
}

export const Context = createContext();

export const LoginContext = createContext();
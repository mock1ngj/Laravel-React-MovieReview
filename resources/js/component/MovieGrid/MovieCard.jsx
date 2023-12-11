import { useContext, useRef } from "react"
import { Context, LoginContext } from "../../main.js"
import ReactStars from 'react-rating-stars-component'
import { signal, useSignal } from "@preact/signals-react"
import axios from "axios"
import Toast from "../Modal/Toast.jsx"

const Reviews = () => {
    const state = useContext(Context);
    const movie = state.movie.value;
    const reviews = state.reviews.value;
    const review = reviews.filter(reviewInfo => reviewInfo.movieID == movie.id);
    return (

        review.map((rev, i) => (
            <div className="mb-3" key={i}>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">{rev.user}</h2>
                <ReactStars edit={false} value={parseInt(rev.ratings)} starCount={5} />
                <p className="mt-1 text-gray-500 dark:text-gray-400">{rev.review}</p>
            </div>
        ))

    )
}

const ReviewForm = ({ id, title, user }) => {
    const state = useContext(Context);
    const rating = useSignal();
    const comment = useRef();
    const ratingChanged = (newRating) => {
        rating.value = newRating;
    };

    const reviewHandler = () => {
        let reviewForm = { user: user.username, movieID: id, review: comment.current.value, ratings: rating.value };
        axios.post('/reviews', reviewForm).then(() => {
            state.update.value = true;
        }).catch(() => {
            state.alert.value.show = true;
            state.alert.value.message = 'fail';
        });
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={50}
                        activeColor="#ffd700"
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="comment" className="block text-sm font-medium mb-2 dark:text-white">Comment</label>
                    <textarea ref={comment} id="comment" className="text-area" rows="3" placeholder="Comment"></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={reviewHandler}
                        className="mr-4 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        Leave A Review
                    </button>
                    <button onClick={() => { state.content.value = 'home' }}
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        Go Back
                    </button>
                </div>
                {/* {state.alert.value.show ? <Toast message={state.alert.value.message}/>: <></>} */}
            </div>
        </>
    )
}

const UserReviews = ({id, title, desc, loggedIn, image }) => {
    const state = useContext(Context);
    console.log(id);
    return (
        <div className="flex mx-4 my-5 flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-center mt-4">
                <img className="w-1/3 h-auto rounded" src={image} alt="Image Description" />
            </div>
            <div className="p-4 md:p-5">
                <h2 className="text-lg text-center font-bold text-gray-800 dark:text-white">
                    Title:{title}
                </h2>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    Description:
                </h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    {desc}
                </p>
                <h2 className="text-lg text-center font-bold text-gray-800 dark:text-white">
                    Reviews:
                </h2>
                <Reviews />
                {Object.keys(loggedIn).length != 0 ? <ReviewForm id={id} title={title} user={loggedIn} /> :
                    <div className="flex justify-center">
                        <button onClick={() => { state.content.value = 'home' }}
                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            Go Back
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

const MovieCard = ({ id, title, desc, loggedIn, image }) => {
    const state = useContext(Context);
    return (

        <>
            {state.content.value != 'review' ? (
                <div className="flex mx-4 my-5 flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <img className="w-full h-auto rounded-t-xl" src={image} alt="Image Description" />
                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {title}
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            {desc}
                        </p>
                        <button onClick={() => {
                            state.content.value = 'review';
                            state.movie.value = {id:id, movieTitle: title, movieDescription: desc, image: image }
                        }}
                            className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            Review
                        </button>
                    </div>
                </div>
            ) : (
                <UserReviews id={id} title={title} desc={desc} loggedIn={loggedIn} image={image} />
            )}
        </>
    )
}
export default MovieCard;
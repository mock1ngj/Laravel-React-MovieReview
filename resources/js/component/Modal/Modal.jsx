import { useContext, useEffect, useRef } from "react";
import { Context } from "../../main";
import { useForm } from "react-hook-form";
import { HSOverlay } from "preline";
import axios from "axios";

const Content = ({ action, movie, data }) => {
    const { handleSubmit, register, setValue } = useForm();
    let info;
    //filter
    if (data.value != null) {
        info = data.value.filter(movieInfo => movieInfo.movieTitle == movie.value.movieTitle);
    }

    //set
    if (action.value == 'edit') {
        setValue('movieTitle', info[0].movieTitle);
        setValue('movieDescription', info[0].movieDescription);
    }

    function onSubmit(data) {
        const formData = new FormData();
        formData.append('movieTitle', data.movieTitle);
        formData.append('movieDescription', data.movieDescription);

        if (data.image.length != 0) {
            formData.append('image', data.image[0]);
        }

        //append and specify _method cause laravel is not happy with axios.put
        //and had to bypass with post
        if (action.value == 'edit') {
            formData.append('_method', 'PUT');
            axios.post(`/movies/${info[0].movieTitle}`, formData)
            .then(() => {
                action.value = 'update';
            });
        }
        else {
            axios.post('/movies', formData)
            .then((res) => {
                action.value = 'update';
            });
        }
        HSOverlay.close('#hs-basic-modal');
    }

    return (
        <div className="text-center">
            {action.value != 'delete' ? (
                <>
                    <form id="form" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="movie-title" className="block text-sm font-medium mb-2 dark:text-white">Movie Title</label>
                            <input
                                type="text"
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                placeholder="Movie Title"
                                {...register("movieTitle")}
                            />
                        </div>
                        <div>
                            <label htmlFor="movie-description" className="block text-sm font-medium mb-2 dark:text-white">Movie Title</label>
                            <textarea
                                placeholder="Movie Description"
                                className="text-area"
                                rows="3"
                                {...register("movieDescription")}
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <label className="block">
                                <span className="sr-only">Upload an Image</span>
                                <input type="file"
                                    className="block w-full text-sm text-gray-500
                                file:me-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-600 file:text-white
                                hover:file:bg-blue-700
                                file:disabled:opacity-50 file:disabled:pointer-events-none
                                dark:file:bg-blue-500
                                dark:hover:file:bg-blue-400"
                                    {...register("image")}
                                />
                            </label>
                        </div>
                    </form>
                    <div>

                    </div>
                </>
            ) : (
                <p className="mt-1 text-gray-800 dark:text-white">
                    Are you Sure?
                </p>)}
        </div>
    )
}

const Modal = () => {
    const state = useContext(Context);
    
    function delHandler(e) {
        const title = e.currentTarget.value;
        axios.delete(`/movies/${title}`).then(() => {
            state.action.value = 'update';
        });
        HSOverlay.close('#hs-basic-modal');
    }

    return (
        <div
            id="hs-basic-modal"
            className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
        >
            <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                            {state.action.value}
                        </h3>
                        <button
                            type="button"
                            className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                            data-hs-overlay="#hs-basic-modal"
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="w-3.5 h-3.5"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <Content action={state.action} movie={state.movie} data={state.data} />
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                        <button
                            type="button"
                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            onClick={() => {
                                state.movie.value = { movieTitle: '' };
                                state.action.value = 'none';
                                HSOverlay.close('#hs-basic-modal');
                            }}
                        >
                            Close
                        </button>
                        {state.action != 'delete' ? (
                            <button
                                type="submit"
                                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                form="form"
                            >
                                Save changes
                            </button>
                        ) : (
                            <button
                                value={state.movie}
                                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                onClick={(e) => { delHandler(e) }}
                            >
                                Ok
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;
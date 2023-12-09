import { useContext, useEffect, useState } from "react"
import { BsFillTrashFill, BsGear } from 'react-icons/bs'
import { Context } from "../../main"
import { batch, useSignal } from "@preact/signals-react"
import { HSOverlay } from "preline"
import { FaPlus } from "react-icons/fa6"

const AdminRows = ({ title, desc }) => {
    const state = useContext(Context);
    
    function delHandler(e) {
        batch(() => {
            state.movie.value = e.currentTarget.value;
            state.action.value = 'delete';
        })
        HSOverlay.open('#hs-basic-modal');
    }

    function editHandler(e) {
        batch(() => {
            state.movie.value = { movieTitle: e.currentTarget.value };
            state.action.value = 'edit';
        });

        HSOverlay.open('#hs-basic-modal');
    }

    return (
        <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                {title}
            </td>
            <td className="px-6 py-4 max-w-md whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 overflow-hidden">
                {desc}
            </td>
            <td className="px-6 py-4 whitespace-nowrap place-content-center">
                <button type="button" className="del-btn bg-red-500 mx-4" value={title} onClick={(e) => delHandler(e)}>
                    <BsFillTrashFill />
                </button>
                <button type='button' className="edit-btn bg-blue-600" value={title} onClick={(e) => editHandler(e)}>
                    <BsGear />
                </button>
            </td>
        </tr>
    )
}

const AdminTr = () => {
    const state = useContext(Context);
    const movies = state.data;
    let response;
    if (movies.value != null) {
        response = movies.value;
        return (
            response.map((movie, i) => (
                <AdminRows title={movie.movieTitle}
                    desc={movie.movieDescription}
                    key={movie.movieTitle}
                />
            ))
        )
    }
    return (
        <tr>
            <td>Wait</td>
        </tr>
    )
}

const AdminTable = () => {
    return (
        <div className="flex mx-auto my-auto">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase">Title</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase">Description</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AdminTr />
                                <tr>
                                    <td>
                                        <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                            onClick={() => {
                                                HSOverlay.open('#hs-basic-modal');
                                            }}>
                                            <FaPlus />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminTable;
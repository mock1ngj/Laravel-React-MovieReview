import { IoFilmOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import axios from "axios";

const Sidebar = () => {
    return (
        <div id="docs-sidebar" className="flex fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-6">
                <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Brand</a>
            </div>
            <nav className="p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                <ul className="space-y-1.5">
                    <li>

                    </li>
                    <li><a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                        <IoFilmOutline />
                        Movie
                    </a></li>
                    <li>
                        <button
                            onClick={() => {
                                axios.post('/logout').then(() => {
                                    window.location = '/home';
                                });
                            }}
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            <CiLogout />
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Sidebar;
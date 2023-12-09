import { useContext } from "react";
import axios from "axios";
import { Context } from "../main.js";



const IsLoggedIn = ({ logout }) => {
    return (
        <>
            <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Reviews </a>
            <button type="button"
                onClick={() => {
                    axios.post('/logout').then(()=>{
                        logout.value = {};
                    });
                }}
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Logout
            </button>
        </>
    )
}

const Navbar = ({ loggedIn }) => {
    const state = useContext(Context);
    return (
        <header className="flex mb-10 flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-blue-900">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div className="flex items-center justify-between">
                    <a className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white" href="#">
                        <img className="w-10 h-auto" src="../docs/assets/img/logo/logo-short.png" alt="Logo" />
                        Brand
                    </a>
                </div>
                <div id="navbar-image-and-text-2" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                        <button onClick={() => { state.content.value = 'home' }} className="font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" aria-current="page">Home</button>
                        {Object.keys(loggedIn.value).length != 0 ? (
                            <IsLoggedIn logout={loggedIn} />
                        ) : (
                            <a href="/login"
                                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                Login
                            </a>
                        )}

                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useForm } from "react-hook-form";
import axios from 'axios';

const GoogleButton = () => {

    function googleHandler(credRes) {
        console.log(credRes);
        const access_token = credRes.access_token;
        console.log(access_token);
        axios.post(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
            .then((res) => {
                const temp = res.data;
                const info = { username: temp.name, email: temp.email, type: 0 };
                axios.post('/auth', info).then((res) => {
                    window.location = res.data;
                });
            });
    }

    const login = useGoogleLogin({
        onSuccess: res => googleHandler(res),
    });

    return (
        <div className="mt-5">
            <button onClick={() => login()} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                </svg>
                Sign in with Google
            </button>
        </div>
    )
}

const Login = () => {
    const { handleSubmit, register } = useForm();

    function loginHandler(data) {
        axios.post('auth', data).then((res) => {
            window.location = res.data;
        });
    }

    return (

        <div className="flex justify-center h-screen w-screen items-center">
            <div className="w-full md:w-1/2 flex flex-col items-center ">
                {/* <!-- text login --> */}
                <h1 className="text-center text-2xl font-bold text-white mb-6">LOGIN</h1>
                <form id="form" onSubmit={handleSubmit(loginHandler)} className="w-3/4">
                    {/* 					<!-- email input --> */}
                    <div className="mb-6">
                        <input type="text" {...register("username")}
                            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
                            placeholder="User Name/Email" />
                    </div>
                    {/* 					<!-- password input --> */}
                    <div className="mb-6">
                        <input type="password" {...register("password")}
                            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 "
                            placeholder="Password" />
                    </div>
                </form>
                {/*<!-- button --> */}
                <div className="w-3/4 mt-4">
                    <button form="form" type="submit" className="User py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700">
                        Log In</button>
                </div>
                <div className="w-3/4 mt-4">
                    <button type="button" onClick={() => { window.location = '/home'; }}
                        className="py-4 bg-slate-500 w-full rounded text-blue-50 font-bold hover:bg-blue-700">
                        Continue as Guest</button>
                </div>
                <div className="w-3/4 mt-4">
                    <GoogleButton />
                </div>

            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(

    <GoogleOAuthProvider clientId='590952320930-ki1vhssu8a5u4ic7qapk243pa1osmugk.apps.googleusercontent.com'>
        <Login />
    </GoogleOAuthProvider>
)
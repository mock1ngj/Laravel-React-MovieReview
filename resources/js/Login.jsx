import { useRef } from 'react'
import ReactDOM from 'react-dom/client';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useForm } from "react-hook-form";
import axios from 'axios';
const Login = () => {
    const { handleSubmit, register } = useForm();
    const loginForm = useRef(null);

    function loginHandler(data) {
        axios.post('auth', data).then((res) => {
            window.location = res.data;
        });
    }

    return (
        <GoogleOAuthProvider clientId='590952320930-ki1vhssu8a5u4ic7qapk243pa1osmugk.apps.googleusercontent.com'>
            <div className="flex justify-center h-screen w-screen items-center">
                <div className="w-full md:w-1/2 flex flex-col items-center ">
                    {/* <!-- text login --> */}
                    <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">LOGIN</h1>
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
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                let temp = jwtDecode(credentialResponse.credential);
                                console.log(temp);
                                const info = { username: temp.name, email: temp.email, type: 0 }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>

                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Login />
)
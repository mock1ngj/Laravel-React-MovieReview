import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="grid h-screen px-4 bg-white place-content-center">
            <i className="tracking-widest text-gray-500 uppercase">{error.statusText || error.message}</i>
        </div>
    )
}
export default ErrorPage;
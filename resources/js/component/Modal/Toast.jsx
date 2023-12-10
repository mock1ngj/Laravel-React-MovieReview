import('preline')
const SuccessToast = () => {
    return (
        <div id="#alert" className="absolute bottom-0 end-0 max-w-xs bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
            <div class="flex p-4">
                Success
                <div class="ms-auto">
                    <button type="button" class="inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-lg text-red-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-red-200" data-hs-remove-element="#alert">
                        <span class="sr-only">Close</span>
                        <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

const WarningToast = () => {
    return (
        <div id="alert" className="absolute bottom-0 end-0 max-w-xs hs-removing:translate-x-5 hs-removing:opacity-0 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
            <div class="flex p-4">
                Fail
                <div class="ms-auto">
                    <button type="button" class="inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-lg text-red-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-red-200" data-hs-remove-element="#alert">
                        <span class="sr-only">Close</span>
                        <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

const Toast = ({ message }) => {
    return (
        message == 'success' ? <SuccessToast /> : <WarningToast />
    )
}

export default Toast;
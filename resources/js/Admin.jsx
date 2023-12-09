import ReactDOM from 'react-dom/client';
import { Context } from "./main"
import Modal from './component/Modal/Modal'
import Sidebar from "./component/Sidebar"
import AdminTable from "./component/Table/AdminTable"
import { adminState } from "./main"
import('preline')

const Admin = () => {

    return (
        <div className="flex h-full">
            <Context.Provider value={adminState()}>
                <div className="flex">
                    <Sidebar />
                </div>
                <div className="flex grow justify-center">
                    <AdminTable />
                </div>
                <Modal />
            </Context.Provider>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Admin />
)
import { Sidebar } from '../components'
import TextEditor from '../components/TextEditor'
import { sidebarLinkAdmin } from '../utils/constants'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
    return (
        <div className="w-full h-[100vh] flex bg-lightGrey">
            <Sidebar links={sidebarLinkAdmin} />

            <section className='flex-1'>
                <Outlet />
            </section>
        </div>
    )
}

export default AdminDashboard
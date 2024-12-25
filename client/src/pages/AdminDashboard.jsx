import { Sidebar } from '../components'
import TextEditor from '../components/TextEditor'
import { sidebarLinkAdmin } from '../utils/constants'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
    return (
        <div className="w-full h-[100vh] flex bg-lightGrey overflow-y-auto">
            <Sidebar links={sidebarLinkAdmin} />

            <section className='flex-1 h-fullScreen overflow-y-auto'>
                <Outlet />
            </section>
        </div>
    )
}

export default AdminDashboard
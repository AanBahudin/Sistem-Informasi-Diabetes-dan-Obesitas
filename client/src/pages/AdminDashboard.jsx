import { Sidebar } from '../components'
import TextEditor from '../components/TextEditor'
import { sidebarLinkAdmin } from '../utils/constants'
import { Outlet } from 'react-router-dom'


export const loader = async() => {
    try {
      const { data } = await customFetch.get('/users/current-user')
      
      if (data.user.role === 'user') {
        return redirect('/dashboard')
      }
      return data;
    } catch (error) {
      return redirect('/')
    } 
}

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
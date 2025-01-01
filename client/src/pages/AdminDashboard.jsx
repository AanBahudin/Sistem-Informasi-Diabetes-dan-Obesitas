import { Sidebar } from '../components'
import { sidebarLinkAdmin } from '../utils/constants'
import { Outlet, useNavigate,  } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

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

  const navigate = useNavigate()

  const logoutUser = async() => {
    toast.success('logout successfully!')
    await customFetch.get('/auth/logout')
    navigate('/')
  }
  
  return (
      <div className="w-full h-[100vh] flex bg-lightGrey overflow-y-auto">
          <Sidebar links={sidebarLinkAdmin} logoutFunction={logoutUser} />

          <section className='flex-1 h-fullScreen overflow-y-auto'>
              <Outlet />
          </section>
      </div>
  )
}

export default AdminDashboard
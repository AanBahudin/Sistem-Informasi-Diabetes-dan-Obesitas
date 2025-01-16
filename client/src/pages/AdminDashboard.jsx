import { Sidebar } from '../components'
import { sidebarLinkAdmin } from '../utils/constants'
import { Outlet, useLoaderData, useNavigate,  } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { handleToast } from '../utils/constants'

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
  const data = useLoaderData()

  const logoutUser = async() => {
    handleToast('success', 'Logout Berhasil', 'Sampai ketemu kembali !', 1000)
    await customFetch.get('/auth/logout')
    navigate('/')
  }
  
  return (
      <div className="w-full h-[100vh] flex bg-slate-100 overflow-y-auto">
          <Sidebar links={sidebarLinkAdmin} logoutFunction={logoutUser} data={data.user} />

          <section className='flex-1 h-fullScreen overflow-y-auto'>
              <Outlet />
          </section>
      </div>
  )
}

export default AdminDashboard
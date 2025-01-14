import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { Sidebar } from "../components"
import { toast } from 'react-toastify'
import { useContext, createContext } from 'react'
import { sidebarLink as sidebarLinkUser } from "../utils/constants"
import customFetch from "../utils/customFetch"


const DashboardContext = createContext()

export const loader = async() => {

  try {
    const { data } = await customFetch.get('/users/current-user')
    
    if (data.user.role === 'admin') {
      return redirect('/admin/dashboard')
    }
    return data;
  } catch (error) {
    return redirect('/')
  }
}

const DashboardLayout = () => {

  const navigate = useNavigate()
  const data = useLoaderData()

  const logoutUser = async() => {
    await customFetch.get('/auth/logout')
    toast.success('logout successfully!')
    navigate('/')
  }

  const deleteProfileFunc = async(event, url) => {
    event.preventDefault()

    await customFetch.patch('/users/delete-profile')
    window.location.reload('/dashboard/profile')
    toast.success('Foto dihapus!')
  }

  return (
    <DashboardContext.Provider value={{
      data,
      logoutUser,
      deleteProfileFunc
    }}>
      <div className="w-full h-[100vh] flex bg-white">
          <Sidebar links={sidebarLinkUser} logoutFunction={logoutUser} data={data.user} />

          <section className="flex-1 h-[100vh] overflow-y-auto">
              <Outlet />
          </section>
      </div>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout
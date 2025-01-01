import { Outlet, redirect, useNavigate } from "react-router-dom"
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

  const logoutUser = async() => {
    await customFetch.get('/auth/logout')
    toast.success('logout successfully!')
    navigate('/')
  }

  return (
    <DashboardContext.Provider value={{
      logoutUser
    }}>
      <div className="w-full h-[100vh] flex bg-lightGrey">
          <Sidebar links={sidebarLinkUser} logoutFunction={logoutUser} />

          <section className="flex-1 h-[100vh] overflow-y-auto">
              <Outlet />
          </section>
      </div>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout
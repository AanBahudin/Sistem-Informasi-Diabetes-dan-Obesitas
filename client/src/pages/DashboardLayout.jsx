import { Outlet, redirect } from "react-router-dom"
import { Sidebar } from "../components"
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
  return (

    <DashboardContext.Provider value={{

    }}>
      <div className="w-full h-[100vh] flex bg-lightGrey">
          <Sidebar links={sidebarLinkUser} />

          <section className="flex-1 h-[100vh] overflow-y-auto">
              <Outlet />
          </section>
      </div>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout
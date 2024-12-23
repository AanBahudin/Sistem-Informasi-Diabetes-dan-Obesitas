import { Outlet } from "react-router-dom"
import { Sidebar } from "../components"
import { useContext, createContext } from 'react'


const DashboardContext = createContext()

const DashboardLayout = () => {
  return (

    <DashboardContext.Provider value={{

    }}>
      <div className="w-full h-[100vh] flex bg-lightGrey">
          <Sidebar />

          <section className="flex-1">
              <Outlet />
          </section>
      </div>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout
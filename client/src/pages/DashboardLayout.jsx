import { Outlet } from "react-router-dom"
import { Sidebar } from "../components"


const DashboardLayout = () => {
  return (
    <div className="h-[100vh] grid grid-cols-12 bg-gray-400">
        <section className="w-full h-full col-span-1">
            <Sidebar />
        </section>

        <section className="grid-span-10 w-full">
            <Outlet />
        </section>
    </div>
  )
}

export default DashboardLayout
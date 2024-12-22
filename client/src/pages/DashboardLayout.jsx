import { Outlet } from "react-router-dom"
import { Sidebar } from "../components"


const DashboardLayout = () => {
  return (
    <div className="h-[100vh] bg-green-300  grid grid-cols-12">
        <section className="w-full h-full col-span-1 bg-green-100 ">
            <Sidebar />
        </section>

        <section className="grid-span-10 w-full">
            <Outlet />
        </section>
    </div>
  )
}

export default DashboardLayout
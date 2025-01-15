import { SidebarLink } from '../components'
import { Cross } from 'lucide-react';
import { loginPhoto } from '../assets/images'

const Sidebar = ({ links, logoutFunction, data }) => {

  console.log(data);
  

  return (
    <div className='w-[15%] h-full flex flex-col justify-between items-center pt-10 bg-slate-100'>
      <div className='w-full'>
        <section className='w-full flex items-center justify-center gap-x-4'>
          <Cross className='stroke-white bg-blue/80 p-2 w-10 h-10 rounded xl' />
          <h1 className='text-center font-semibold text-xl select-none text-slate-900'>Dashboard</h1>
        </section>
          
            
        <section className='w-full flex flex-col gap-y-2 items-center justify-start mt-16'>
          {links.map((item, index) => {
            return <SidebarLink key={index} {...item} />
          })}
        </section>
      </div>
        
      <div className='w-full py-2 px-6 flex items-center justify-center gap-x-6 bg-slate-200'>
          <div className='h-fit'>
            <img className='w-14 h-14 object-cover border-[2px] border-white   rounded-full' src={data.photo || loginPhoto} alt="" />
          </div>

          <section className=''>
            <h1 className='text-sm font-semibold text-slate-700'>{data.nama || 'Administrator'}</h1>
            <p className='text-xs text-slate-500 truncate'>{data.email}</p>
            <button onClick={logoutFunction} className='w-full text-xs mt-2 py-1 rounded-md border-[2px] cursor-default text-slate-700 duration-200 ease-in-out hover:bg-red-300 hover:text-white border-red-300'>keluar</button>
          </section>
      </div>
        
    </div>
  )
}

export default Sidebar
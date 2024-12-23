import { NavLink } from 'react-router-dom';
import { sidebarLink } from '../utils/constants'
import { LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className='w-[8%] h-full flex flex-col justify-between items-center py-10 bg-white'>
        <h1 className='text-center font-medium select-none'>E-Health</h1>

        <div className='w-20 h-12 mx-auto flex flex-col gap-y-4 items-stretch justify-center'>
          {sidebarLink.map((item, index) => {
            return (
              <NavLink key={index} to={item.path} className={({ isActive }) => `rounded-lg px-3 py-4 duration-300 ease-in-out flex-col items-center justify-center text-center ${isActive ? 'bg-lightGrey stroke-blue shadow-lg text-grey gap-y-2' : 'text-transparent gap-y-0'}`} end>
                {item.icon}
                <p className='text-[10px] mt-2'>{item.name}</p>
              </NavLink>
            )
          })}
        </div>
        
        <LogOut size={25} className='stroke-[1.5px] mx-auto stroke-gray-600'/>
    </div>
  )
}

export default Sidebar
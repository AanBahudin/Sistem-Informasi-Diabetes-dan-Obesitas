import React from 'react'
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SidebarLinks = ({ icon, name, path }) => {
  return (
    <NavLink className={({ isActive }) =>
      `border-l-[4px] hover:shadow-sm group w-full px-2 py-4 cursor-default
       border-transparent hover:border-l-[4px] rounded-md
       duration-200 ease-in-out pl-4 ${isActive ? 'bg-slate-200 text-slate-900 border-blue/80' : ''}`
    } end={true} to={path}>
        <div className='flex items-center justify-between'>

          <div className='flex gap-x-4'>
            <span className='group-hover:stroke-slate-900'>
              {icon}
            </span>
            <p className='text-sm text-slate-600 group-hover:text-slate-950'>{name}</p>
          </div>

          <NavLink  className={({ isActive }) => `${isActive ? 'visible' : 'invisible'}`} to={path} end>
            <ChevronRight className="w-3 h-3 mr-4 my-auto group-hover:stroke-blue/80 group-hover:visible" />
          </NavLink>
        </div>
    </NavLink>
  )
}

export default SidebarLinks
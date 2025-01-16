import React from 'react'
import { Check, Info, TriangleAlert, CircleAlert } from 'lucide-react'

const CustomToast = ({ closeToast, type, title, description }) => {
    return (
      <div className="w-[500px] flex items-center gap-x-6">
        {/* WILL FIX THIS LOGIC LATER */}
        { type === 'success' ?  <Check className='stroke-slate-900 ' /> : (
            type === 'warning' ? <CircleAlert className='stroke-slate-900 '/> : (
                type === 'error' ? <TriangleAlert className='stroke-slate-900'/> : <Check className='stroke-white ' />
            )
        )}
        
        <div>
            <h1 className='text-slate-900 font-semibold text-sm'>{title}</h1>
            <p className='text-[12px] text-slate-700 mt-1'>{description}</p>
        </div>
      </div>
    )
  }

export default CustomToast
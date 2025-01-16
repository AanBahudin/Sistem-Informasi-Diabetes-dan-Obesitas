import React from 'react'

const MethodCard = ({ icon, judul, desc }) => {
  return (
    <article className='flex gap-x-3 items-start justify-center'>
        {icon}
    <div>
        <h5 className='text-blue/80 text-[18px] font-semibold mb-1'>{judul}</h5>
        <p className='text-sm leading-relaxed text-slate-700'>{desc}</p>
    </div>
    </article>
  )
}

export default MethodCard
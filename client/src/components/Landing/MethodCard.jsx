import React from 'react'

const MethodCard = ({ icon, judul, desc }) => {
  return (
    <article className='flex gap-x-3 items-start justify-center'>
        {icon}
    <div>
        <h5 className='text-blue text-[18px] font-semibold mb-1'>{judul}</h5>
        <p className='text-sm leading-relaxed'>{desc}</p>
    </div>
    </article>
  )
}

export default MethodCard
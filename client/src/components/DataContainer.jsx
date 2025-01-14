import React from 'react'

const DataContainer = ({label, value}) => {
  return (
    <article className='w-full '>
        <h2 className='font-semibold text-slate-700'>{label}</h2>
        <p className='w-full border-[2px] py-2 text-slate-700/80 border-slate-400 rounded-lg text-sm outline-none px-4 '>{value}</p>
    </article>
  )
}

export default DataContainer
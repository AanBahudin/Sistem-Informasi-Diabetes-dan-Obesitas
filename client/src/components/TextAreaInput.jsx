import React from 'react'

const TextAreaInput = ({ name, labelText, placeholder, defaultValue, isFirstItem }) => {
  return (
    <article className='flex flex-col'>
      <label htmlFor={name} className='font-semibold text-slate-700 capitalize'>{labelText}</label>
      <textarea name={name} id={'test'} placeholder={placeholder} className='w-full h-[20vh] overflow-y-auto resize-none border-[2px] py-2 text-slate-700/80 border-slate-400 rounded-lg text-sm outline-none px-4'></textarea>
    </article>
  )
}

export default TextAreaInput
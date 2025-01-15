import React from 'react'

const FormSelect = ({label, inputName, defaultValue, list}) => {
  return (
    <article className='w-full '>
        <label htmlFor={inputName} className='font-semibold text-slate-700'>{label}</label>
        <select
          name={inputName} 
          id={inputName} 
          required 
          defaultValue={defaultValue || 'Pria'}
          className='w-full border-[2px] py-2 text-slate-700/80 border-slate-400 rounded-lg text-sm outline-none px-4 '>
            {list.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
            })}
        </select>
    </article>
  )
}

export default FormSelect
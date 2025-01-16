import React from 'react'

const FormInputProfile = ({label, type, inputName, defaultValue, isRequired=false, placeholder}) => {
  return (
    <article className='w-full '>
        <label htmlFor={inputName} className='font-semibold text-slate-800 capitalize'>{label}</label>
        <input 
        type={type}
        name={inputName}
        id={inputName}
        required={isRequired}
        placeholder={placeholder}
        defaultValue={type === 'number' ? defaultValue || 0 : defaultValue || ''}
        className='w-full border-[2px] py-2 placeholder:text-slate-700/80 text-slate-700 border-slate-400 rounded-lg text-sm outline-none px-4' />
    </article>
  )
}

export default FormInputProfile
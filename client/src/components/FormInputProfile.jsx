import React from 'react'

const FormInputProfile = ({label, type, inputName, defaultValue, isRequired=false}) => {
  return (
    <article className='w-full '>
        <h2 className='font-semibold text-slate-700 capitalize'>{label}</h2>
        <input 
        type={type}
        name={inputName}
        id={inputName}
        required={isRequired}
        defaultValue={defaultValue || ""}
        className='w-full border-[2px] py-2 text-slate-700/80 border-slate-400 rounded-lg text-sm outline-none px-4 ' />
    </article>
  )
}

export default FormInputProfile
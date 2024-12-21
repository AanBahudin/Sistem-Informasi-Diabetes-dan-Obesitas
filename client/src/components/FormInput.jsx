import React from 'react'

const FormInput = ({ name, labelText, placeholder }) => {
  return (
    <div>
        <label className='text-sm font-semibold' htmlFor="firstname">{labelText}</label>
        <input className='block w-full px-4 py-[10px] ring-1 ring-grey rounded-md mt-2 text-sm placeholder:italic' type="text" name={name} placeholder={placeholder} />
    </div>
  )
}

export default FormInput
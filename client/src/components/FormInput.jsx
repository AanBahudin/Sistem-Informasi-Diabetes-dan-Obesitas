import React from 'react'

const FormInput = ({ name, labelText, placeholder, inputType, isFirstItem }) => {
  return (
    <article className='w-full flex flex-col gap-y-2'>
      <label className='text-sm font-medium' htmlFor={name}>{labelText}</label>
      <input className='py-3  border-[2px] focus:border-grey rounded-md px-4 bg-lightGrey text-sm placeholder:text-sm mb-4 outline-none'  type={inputType} name={name} id={name} placeholder={placeholder} autoFocus={isFirstItem} autoComplete='off' required />
    </article>
  )
}

export default FormInput
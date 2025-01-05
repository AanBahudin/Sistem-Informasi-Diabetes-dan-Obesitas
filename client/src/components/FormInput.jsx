import React from 'react'

const FormInput = ({ name, labelText, placeholder, inputType, isFirstItem = false, defaultValue='', useBorder }) => {
  return (
    <article className='w-full flex flex-col gap-y-2'>
      <label className='text-sm font-medium' htmlFor={name}>{labelText}</label>
      <input className={`py-3 border-[1.9px] focus:border-grey/80 rounded-md px-4 bg-lightGrey text-[12px] placeholder:text-small placeholder:italic mb-4 ${useBorder ? 'border-grey/70 bg-white' : 'outline-none'}`}  type={inputType} name={name} id={name} accept={ inputType === 'file' ? 'image/*' : '' } defaultValue={defaultValue} placeholder={placeholder} autoFocus={isFirstItem} autoComplete='off' required />
    </article>
  )
}

export default FormInput
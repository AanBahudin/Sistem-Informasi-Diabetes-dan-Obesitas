import React from 'react'

const TextAreaInput = ({ name, labelText, placeholder, defaultValue, isFirstItem }) => {
  return (
    <article className='w-full flex flex-col gap-y-2'>
        <label className='text-sm font-medium' htmlFor={name}>{labelText}</label>
        <textarea className='py-3 h-[25vh] border-[2px] border-grey/70 rounded-md px-4 bg-white text-small placeholder:text-small placeholder:italic mb-4 outline-none resize-none' name={name} id={name} placeholder={placeholder} required autoFocus={isFirstItem} autoComplete='off' defaultValue={defaultValue}></textarea>
    </article>
  )
}

export default TextAreaInput
import React from 'react'

const FormSelect = ({ name, labelText, isFirstItem, list, defaultValue, useBorder }) => {
  return (
    <article className='w-full flex flex-col gap-y-2'>
      <label className='text-sm font-medium' htmlFor={name}>{labelText}</label>
      <select defaultValue={defaultValue} className={`py-3  border-[2px] focus:border-grey rounded-md px-4 bg-lightGrey text-sm placeholder:text-sm mb-4 outline-none ${ useBorder ? 'border-grey/70 bg-white' : '' }`} name={name} id={name} autoFocus={isFirstItem} autoComplete='off' required>
            {list.map((item, index) => {
                return (
                    <option key={index} value={item}>{item}</option>
                )
            })}
      </select>
    </article>
  )
}

export default FormSelect
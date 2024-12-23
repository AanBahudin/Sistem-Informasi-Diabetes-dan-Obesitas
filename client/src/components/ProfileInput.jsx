import React from 'react'

const ProfileInput = ({ isEdit, label, name, defaultValue, isAutoFocus }) => {
  return (
    <article className='h-[40px] flex flex-col gap-y-2'>
        <h4 className='font-medium text-medium'>{label}</h4>
        {isEdit ? (
            <input type="text" name={name} id={name}  defaultValue={defaultValue || ''} className='text-small p-2 rounded-md outline-none' autoComplete='off' spellCheck="false" autoFocus={isAutoFocus}/>
        ) : (
            <p className='text-medium text-gray-500'>{defaultValue || '-'}</p>
        )}
    </article>
  )
}

export default ProfileInput
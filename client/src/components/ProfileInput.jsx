import React from 'react'

const ProfileInput = ({ isEdit, label, name, defaultValue, isAutoFocus, typeInput='input', lists, inputType='text', placeholder }) => {
  return (
    <article className='h-[40px] flex flex-col gap-y-2'>
        <h4 className='font-medium text-medium'>{label}</h4>
        {isEdit ? (

            typeInput === 'input' ? (

              inputType === 'date' ? (
                <input type='date' name={name} id={name} defaultValue={defaultValue || ''} className='text-small p-2 rounded-md outline-none' />
              ) : (
                inputType === 'file' ? (
                  <input type={inputType} name={name} id={name} accept='image/*' defaultValue={defaultValue || ''} placeholder={placeholder} className='text-small p-2 rounded-md outline-none' autoComplete='off' spellCheck="false" autoFocus={isAutoFocus}/>
                ) : (
                  <input type={inputType} name={name} id={name} min={0} defaultValue={defaultValue || ''} className='text-small p-2 rounded-md outline-none' autoComplete='off' spellCheck="false" autoFocus={isAutoFocus}/>
                )
              )

            ) : (
              <select type="text" name={name} id={name}  defaultValue={defaultValue} className='text-small p-2 rounded-md outline-none'>
                {lists.map((item, index) => {
                  return <option key={index} value={item}>{item}</option>
                })}
              </select>
            )
        ) : (
            <p className='text-medium text-gray-500'>{defaultValue || '-'}</p>
        )}
    </article>
  )
}

export default ProfileInput
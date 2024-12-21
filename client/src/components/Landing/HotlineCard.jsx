import React from 'react'

const HotlineCard = ({name, value, icon}) => {
  return (
    <div className='w-full py-3 px-5 bg-lightGrey rounded-lg text-grey flex gap-x-6'>
        {icon}

        <article>
        <h5 className='font-semibold text-[14px]'>{name}</h5>
        <p className='text-[12px]'>{value}</p>
        </article>
    </div>
  )
}

export default HotlineCard
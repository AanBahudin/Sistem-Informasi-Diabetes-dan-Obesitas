import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, CalendarRange, Phone } from 'lucide-react'
import moment from 'moment'

const MessageCard = ({index, _id, fullName, email, message, createdAt, contact}) => {
  return (
    <Link to={`./${_id}`} key={index} className='w-[400px] bg-transparent cursor-default hover:bg-[#00bbf9]/20 border-[2px] shadow-md hover:border-transparent border-slate-500/30 rounded-xl p-4 hover:shadow-lg duration-200 ease-in-out'>
        <div className='w-full flex gap-x-4 items-center justify-start'>
            <Mail className='h-5 w-5 stroke-[#00bbf9]' />
            <h1 className='text-sm text-slate-500'>{ index === 0 ? 'Pesan terbaru' : 'Pesan pengguna' }</h1>
        </div>

        <h1 className='mt-4 text-sm font-medium'>{fullName}</h1>
        <h1 className='mb-4 text-[12px] font-normal text-slate-600/80'>{email}</h1>
        <p className='text-slate-600 text-sm'>{message.slice(0, 87)}....</p>

        <div className='w-full flex justify-between items-center mt-6'>
            <article className='flex justify-start items-center gap-x-3'>
                <CalendarRange className='stroke-slate-500 w-4 h-4' />
                <h1 className='text-[12px] text-slate-900'>{moment(createdAt).subtract(10, 'days').calendar()}</h1>
            </article>
            <article className='flex justify-start items-center gap-x-3'>
                <Phone className='stroke-slate-500 w-4 h-4' />
                <h1 className='text-[12px] text-slate-600'>{contact}</h1>
            </article>
        </div>
        </Link>
  )
}

export default MessageCard
import React from 'react'
import customFetch from '../utils/customFetch'
import moment from 'moment'
import { CalendarRange, Sparkle, Trash } from 'lucide-react'
import { useLoaderData } from 'react-router-dom'

export const loader = async({ params }) => {
  try {
    const { data } = await customFetch.get(`/message/${params.id}`)
    return data
  } catch (error) {
    console.log(error);
    return data
  }
}

const SingleMessage = () => {

  const { message } = useLoaderData()

  return (
    <div className='w-full h-full items-center justify-center flex'>

      <section className='w-[60%] h-[80%] bg-transparent border-[2px] border-slate-500/30 rounded-xl p-4 shadow-md'>
        
        <div className='w-full flex gap-x-4 items-center justify-start'>
          <Sparkle className='stroke-[#00bbf9]' />
          <h1 className='text-lg font-semibold text-slate-800'>Pesan Pengguna</h1>
        </div>

        <div className='mt-10 flex flex-col gap-y-2'>
          <article className='flex items-center justify-start'>
            <h5 className='w-[20%] text-sm font-normal text-slate-700'>Pengirim pesan : </h5>
            <h5 className='w-[50%] rounded-md text-sm border-[1px]border-transparent text-slate-500 px-4 py-1'>{message.fullName}</h5>
          </article>

          <article className='flex items-center justify-start'>
            <h5 className='w-[20%] text-sm font-normal text-slate-700'>Email : </h5>
            <h5 className='w-[50%] rounded-md text-sm border-[1px] border-transparent text-slate-500 px-4 py-1'>{message.email  }</h5>
          </article>

          <article className='flex items-center justify-start'>
            <h5 className='w-[20%] text-sm font-normal text-slate-700'>Kontak : </h5>
            <h5 className='w-[50%] rounded-md text-sm border-[1px] border-transparent text-slate-500 px-4 py-1'>{message.contact}</h5>
          </article>
        </div>

        <div className='w-full mt-10 border-t-[2px] h-[50%] bg-slate-200 p-4 no-scrollbar overflow-y-auto rounded-xl'>
          <p className='text-slate-900 text-sm'>{message.message}</p>
        </div>

        <div className='w-full flex mt-4 justify-between'>

          <div className='flex gap-x-2 items-center cursor-default justify-start bg-[#00bbf9]/30 py-2 px-2 rounded-md duration-200 ease-in-out'>
            <CalendarRange className='w-4 h-4 stroke-slate-900' />
            <h5 className='text-[12px] font-normal text-slate-700'>{ moment(message.createdAt).subtract(10, 'days').calendar() }</h5>
          </div>

          <button className='flex gap-x-2 items-center cursor-default justify-start bg-[#ff6b6b]/60 py-2 px-2 rounded-md hover:bg-[#ff6b6b] duration-200 ease-in-out'>
            <Trash className='w-4 h-4 stroke-slate-900' />
            <span className='text-[12px]'>Hapus pesan</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default SingleMessage
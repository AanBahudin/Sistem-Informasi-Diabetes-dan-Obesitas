import React from 'react'
import { Clock, ThumbsUp, Pin } from 'lucide-react'

const ArticleCardsUser = () => {
  return (
    <div className='w-[23%] bg-white shadow-md p-2 rounded-xl'>
        <div className='w-full rounded-xl h-32 bg-slate-500'></div>

        <p className='text-xs text-slate-700 flex items-center justify-start gap-x-4 my-4'>
        <Clock className='w-4 h-4 stroke-slate-400' />
        30 menit yang lalu
        </p>

        <h1 className='text-slate-800 text-sm font-semibold'>Cara mencegah diabetes sejak dini dimulai dari makanan yang dikonsumsi</h1>
        <p className='text-xs text-slate-600 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident earum autem nemo placeat reprehenderit praesentium!</p>

        <div className='w-full mt-4 flex items-center justify-between'>
        <p className='lowercase py-1 px-4 rounded-md text-xs bg-blue/40 '>Diabetes</p>

        <article className='flex gap-x-2 justify-end items-center'>
            <ThumbsUp className='border-[2px] border-blue/60 stroke-blue hover:border-transparent hover:bg-blue/60 hover:stroke-white duration-200 ease-in-out p-1 rounded-md w-6 h-6' />
            <Pin className='border-[2px] border-pink-400 stroke-pink-400 hover:border-transparent hover:bg-pink-400 hover:stroke-white duration-200 ease-in-out p-1 rounded-md w-6 h-6' />
        </article>
        </div>
    </div>
  )
}

export default ArticleCardsUser
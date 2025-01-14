import React from 'react'
import { Clock, ThumbsUp, Pin } from 'lucide-react'
import { Link } from 'react-router-dom'

const ArticleCardsUser = ({ judulArtikel, deskripsi, jenisArtikel, thumbnail }) => {
    judulArtikel = judulArtikel.length >= 70 ? judulArtikel.slice(0, 67) + '...' : judulArtikel
    deskripsi = deskripsi.length >= 70 ? deskripsi.slice(0, 115) + '...' : deskripsi

  return (
    <Link to={`/dashboard/news/${judulArtikel}`} className='max-w-[23%] max-h-[45vh] bg-white shadow-md p-2 rounded-xl flex flex-col cursor-default'>
        <img className='w-full overflow-hidden object-fill object-top rounded-xl h-32 bg-slate-500' src={thumbnail} alt="" />

        <p className='text-xs text-slate-700 flex items-center justify-start gap-x-4 my-4'>
        <Clock className='w-4 h-4 stroke-slate-400' />
        30 menit yang lalu
        </p>

        <h1 className='text-slate-800 text-sm font-semibold'>{judulArtikel}</h1>
        <p className='text-xs text-slate-600 mt-2 flex-grow'>{deskripsi}</p>

        <div className='w-full mt-4 flex items-center justify-between'>
        <p className='lowercase py-1 px-4 rounded-md text-xs bg-blue/40 '>{jenisArtikel}</p>

        <article className='flex gap-x-2 justify-end items-center mt-auto'>
            <ThumbsUp className='border-[2px] border-blue/60 stroke-blue hover:border-transparent hover:bg-blue/60 hover:stroke-white duration-200 ease-in-out p-1 rounded-md w-6 h-6' />
            <Pin className='border-[2px] border-pink-400 stroke-pink-400 hover:border-transparent hover:bg-pink-400 hover:stroke-white duration-200 ease-in-out p-1 rounded-md w-6 h-6' />
        </article>
        </div>
    </Link>
  )
}

export default ArticleCardsUser
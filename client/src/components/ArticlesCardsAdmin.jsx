import React from 'react'
import moment from 'moment'
import { Clock, ThumbsUp, Pin, Pencil, Trash } from 'lucide-react'
import { Form, Link } from 'react-router-dom'

const ArticlesCardsAdmin = ({ _id, judulArtikel, createdAt, deskripsi, jenisArtikel, thumbnail }) => {
  judulArtikel = judulArtikel.length >= 70 ? judulArtikel.slice(0, 67) + '...' : judulArtikel
  deskripsi = deskripsi.length >= 70 ? deskripsi.slice(0, 115) + '...' : deskripsi
  const formattedTime = moment(createdAt).startOf('hour').fromNow(); 

  return (
    <section className='max-w-[23%] max-h-[50vh] bg-white shadow-md p-2 rounded-xl flex flex-col justify-between cursor-default'>
        <Link to={`/admin/dashboard/news/${judulArtikel}`} className='w-[100%]'>
          <img className='w-full overflow-hidden object-cover object-top rounded-xl max-h-32 bg-slate-500' src={thumbnail} alt="" />

          <p className='text-xs text-slate-700 flex items-center justify-start gap-x-4 my-4'>
            <Clock className='w-4 h-4 stroke-slate-400' />
            {formattedTime}
          </p>

          <h1 className='text-slate-800 text-sm font-semibold truncate'>{judulArtikel}</h1>
          <p className='text-xs text-slate-600 mt-2 flex-grow min-w-full max-w-full'>{deskripsi.slice(0, 153)}...</p>
        </Link>

        <div className='w-full mt-4 flex items-center justify-between'>
          <p className='lowercase py-1 px-4 rounded-md text-xs bg-blue/40 '>{jenisArtikel}</p>

          <article className='flex gap-x-2 justify-end items-center mt-auto'>
            <Link to={`/admin/dashboard/news/edit/${judulArtikel}`} >
              <Pencil className={`border-[2px] bg-blue/80 border-transparent stroke-white duration-200 ease-in-out p-1 rounded-md w-6 h-6`} />
            </Link>
            
            <Form method='POST' className='flex items-center'>
              <button type='submit' name='id' value={_id} className='m-0 p-0 border-none bg-transparent'>
                <Trash className={`border-[2px] border-transparent bg-pink-400 stroke-white  duration-200 ease-in-out p-1 rounded-md w-6 h-6`} />
              </button>
            </Form>
          </article>
        </div>
    </section>
  )
}

export default ArticlesCardsAdmin
import React from 'react'
import moment from 'moment'
import { Clock, ThumbsUp, Pin } from 'lucide-react'
import { Form, Link } from 'react-router-dom'

const ArticleCardPublic = ({ _id, judulArtikel, createdAt, bookmark, favorite, deskripsi, jenisArtikel, thumbnail }) => {

    judulArtikel = judulArtikel.length >= 70 ? judulArtikel.slice(0, 67) + '...' : judulArtikel
    deskripsi = deskripsi.length >= 70 ? deskripsi.slice(0, 115) + '...' : deskripsi
    const formattedTime = moment(createdAt).startOf('hour').fromNow(); 

    return (
        <section className='max-w-[23%] max-h-[50vh] bg-white shadow-md p-2 rounded-xl flex flex-col justify-between cursor-default'>
            <Link to={`/artikel/${judulArtikel}`} className='w-full cursor-default'>
                <img className='w-full overflow-hidden object-cover object-top rounded-xl max-h-32 bg-slate-500' src={thumbnail} alt="" />
                <p className='text-xs text-slate-700 flex items-center justify-start gap-x-4 my-4'>
                    <Clock className='w-4 h-4 stroke-slate-400' />
                    {formattedTime}
                </p>
                <h1 className='text-slate-800 text-sm font-semibold'>{judulArtikel}</h1>
                <p className='text-xs text-slate-600 mt-2 flex-grow'>{deskripsi}</p>
            </Link>

            <div className='w-full mt-4 flex items-center justify-between'>
                <p className='lowercase py-1 px-4 rounded-md text-xs bg-blue/40 '>{jenisArtikel}</p>
            </div>
        </section>
    )
}

export default ArticleCardPublic
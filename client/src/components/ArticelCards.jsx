import { Form, Link } from 'react-router-dom' 
import { Clock, ThumbsUp, Pin } from 'lucide-react'
import moment from 'moment'

const ArticelCards = ({_id, thumbnail = '', judulArtikel, deskripsi='', createdAt, jenisArtikel, isInPage='landing', url }) => {

  const newJudulArtikel = judulArtikel.length >= 70 ? judulArtikel.slice(0, 50) + '...' : judulArtikel
  deskripsi = deskripsi.length >= 70 ? deskripsi.slice(0, 80) + '...' : deskripsi
  const formattedTime = moment(createdAt).startOf('hour').fromNow(); 


  return (
    <section className='max-w-[23%] max-h-[50vh] bg-white shadow-md p-2 rounded-xl flex flex-col justify-between cursor-default'>
          <Link to={`/dashboard/news/${judulArtikel}`} className='w-full'>
            <img className='w-full overflow-hidden object-fill object-top rounded-xl min-h-32 bg-slate-500' src={thumbnail} alt="" />

            <p className='text-xs text-slate-700 flex items-center justify-start gap-x-4 my-4'>
              <Clock className='w-4 h-4 stroke-slate-400' />
              {formattedTime}
            </p>

            <h1 className='text-slate-800 text-sm font-semibold'>{newJudulArtikel}</h1>
            <p className='text-xs text-slate-600 mt-2 flex-grow'>{deskripsi}</p>
          </Link>

          <div className='w-full mt-4 flex items-center justify-between'>
            <p className='lowercase py-1 px-4 rounded-md text-xs bg-blue/40 '>{jenisArtikel}</p>

            <article className='flex gap-x-2 justify-end items-center mt-auto'>

              {isInPage === 'bookmark' && (
                <Form method='POST' className='flex items-center'>
                  <input type="hidden" name='id' value={_id} />
                  <button type='submit' name='data' value='bookmark' className='m-0 p-0 border-none bg-transparent'>
                    <Pin className={`border-[2px] 'border-transparent bg-pink-400 stroke-white duration-200 ease-in-out p-1 rounded-md w-6 h-6`} />
                  </button>
                </Form>
              )}

              {isInPage === 'favorite' && (
                <Form method='POST' className='flex items-center'>
                  <input type="hidden" name='id' value={_id} />
                  <button type='submit' name='data' value='favorite' className='m-0 p-0 border-none bg-transparent'>
                    <ThumbsUp className={`border-[2px] bg-blue/80 border-transparent stroke-white duration-200 ease-in-out p-1 rounded-md w-6 h-6`} />
                  </button>
                </Form>
              )}

            </article>
          </div>
      </section>
  )
}

export default ArticelCards
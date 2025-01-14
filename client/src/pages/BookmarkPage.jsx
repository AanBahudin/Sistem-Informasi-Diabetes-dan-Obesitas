import { ArticleCards } from '../components'
import customFetch from '../utils/customFetch'
import { LoaderCircle } from 'lucide-react'
import { redirect, useLoaderData, Form, useNavigation } from "react-router-dom"
import { toast } from 'react-toastify'

export const loader = async() => {
  try {
    const { data } = await customFetch.get('/news/bookmark')
    return data
  } catch (error) {
    console.log(error.response.data.msg);
    return data
  }
}

export const action = async({ request }) => {
  try {
    const data = Object.fromEntries(await request.formData())
    await customFetch.delete(`/news/bookmark/${data.id}`)
    toast.success('artikel dihapus dari bookmark')
    return redirect('.')
  } catch (error) {
    console.log(error.response.data.msg);
    return error
  }
}

const BookmarkPage = () => {

  const { bookmarked } = useLoaderData()
  const isLoading = useNavigation().state === 'loading'
  
  return (
    <section className='w-full h-full overflow-y-auto p-10 flex items-center justify-center bg-slate-50'>
      <section className='w-full h-full '>
        <h1 className='text-3xl text-slate-800 font-semibold'>Artikel Tersimpan Anda</h1>
        <p className='text-slate-600 w-[80%] mt-2'>Semua artikel yang Anda simpan ada di sini. Temukan kembali informasi berharga dengan mudah kapan saja.</p>

        <article className={`w-full mt-10 flex flex-wrap items-stretch ${bookmarked.length < 4 ? 'justify-start' : 'justify-between'} gap-6`}>
        { isLoading ? (
            <div className='w-full flex-1 flex items-center justify-center gap-x-4'>
              <LoaderCircle className='w-6 h-6 stroke-slate-800 animate-spin' />
              <h1 className='text-center text-xl font-medium text-slate-700'>Sedang memuat artikel</h1>
            </div>

          ) : (
            bookmarked.map((item, index) => {
                return <ArticleCards {...item} key={index}/>
              })
          )}
        </article>
      </section>  
    </section>
  )
}

export default BookmarkPage
import React, { useEffect, useState } from 'react'
import { Search, X, LoaderCircle} from 'lucide-react'
import { ArticleCardsAdmin, Loading } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useLoaderData, useNavigation, Link, useNavigate } from 'react-router-dom'
import { handleToast } from '../utils/constants'


export const loader = async({request}) => {

  const url = new URL(request.url);
  const judul = url.searchParams.get("judul");
  
  let newsUrl = judul !== null ? `/news?judul=${judul}` : '/news'

  try {
    const { data } = await customFetch.get(newsUrl)
    return { data }
  } catch (error) {
    console.log(error.response.data.msg);
    return toast.error(error.response.data.msg)
  }
}

export const action = async({ request }) => {

  const formData = await request.formData()
  const data = Object.fromEntries(formData)  
  try {
    await customFetch.delete(`/news/${data.id}`)
    handleToast('success', 'Dihapus', 'Artikel berhasil dihapus', 2000)
  } catch (error) {
    handleToast('error', 'Terjadi Kesalahan', error.response?.data?.msg, 2000)
    return error
  }
}

const AllNews = () => {

  const { data } = useLoaderData()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  const [isSearch, setIsSearch] = useState('');
  const [debouncedQuery, setDebounceQuery] = useState('')
  const [filter, setFilter] = useState('');

  
  //   UPDATE URL
  useEffect(() => {
    if (debouncedQuery) {
      navigate(`?judul=${encodeURIComponent(debouncedQuery)}`);
    } else {
      navigate("/admin/dashboard"); // Menghapus semua query parameter dari URL
    }
  }, [debouncedQuery, navigate])
  
  
  //    DEBOUNCE MENGGUNAKAN USEEFFECT
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(isSearch.trim())
    }, 500)
    
    return () => {
      clearTimeout(handler)
    }
  }, [isSearch])
  

  return (
    <section className='w-full h-full overflow-y-auto p-10 flex items-center justify-center bg-slate-50'>
      <section className='w-full h-full '>
        <h1 className='text-3xl text-slate-800 font-semibold'>Kelola Semua Artikel</h1>
        <p className='text-slate-600 w-[80%] mt-2'>Di sini Anda dapat melihat, mengedit, dan mengelola semua artikel yang telah dibuat. Pantau status artikel untuk memastikan konten selalu relevan dan up-to-date</p>

        <article className='w-full mt-10 flex items-end gap-x-4 justify-normal'>
          <div className='w-[75%] mt-4'>
            <div className='w-full flex items-center justify-between h-10 rounded-xl border-[2px] border-slate-400 focus-within:border-blue/80'>
              <Search className='stroke-slate-600 w-5 h-5 ml-2' />
              <input type="text" name="email" id="email" className='w-full px-6 h-full text-md outline-none focus:placeholder:text-transparent placeholder:text-sm text-slate-800' autoComplete='off' placeholder='tips mengurangi berat badan '  required autoCorrect='off' onChange={(e) => setIsSearch(e.target.value)} value={isSearch}/>
              <X onClick={() => setIsSearch('')} className={` ${isSearch ? 'visible' : 'invisible'} stroke-red-400 w-5 h-5 mr-2`} />
            </div>
          </div>

          <select name="filter" id="filter" className='flex-1 h-10 border-[2px] border-slate-400 rounded-xl text-sm px-4 outline-none focus:border-blue/80' onChange={(e) => setFilter(e.target.value)}>
            <option value="">Semua</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Obesitas">Obesitas</option>
          </select>
        </article>

        <article className={`w-full mt-10 flex flex-wrap items-stretch ${data.news?.length < 4 ? 'justify-start' : 'justify-between'} gap-6`}>

          { isLoading ? (
            <div className='w-full flex-1 flex items-center justify-center gap-x-4'>
              <LoaderCircle className='w-6 h-6 stroke-slate-800 animate-spin' />
              <h1 className='text-center text-xl font-medium text-slate-700'>Sedang memuat artikel</h1>
            </div>

          ) : (
            data.news.filter((newItem) => {
              if (filter) {
                return newItem.jenisArtikel === filter
              } else {
                return newItem
              }
              }).map((item, index) => {
                return <ArticleCardsAdmin key={index} {...item} />
              })
          )}

        </article>
      </section>  
    </section>
  )
}

export default AllNews
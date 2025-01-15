import React, { useEffect, useState } from 'react'
import { Search, X, FilePenLine, Trash2 } from 'lucide-react'
import { ArticleCardsAdmin, Loading } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { Form, useLoaderData, useNavigation, Link, useNavigate } from 'react-router-dom'


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
    toast.success('Artikel Dihapus')
  } catch (error) {
    toast.error(error.response.data.msg)
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
  
  if (isLoading) {
    return <Loading />
  }

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


  //   <div className='w-full  h-full flex flex-col p-10'>

  //   <section className="w-full flex justify-between items-center border-b-[1px] py-2 border-grey/50">
  //     <h1 className='text-2xl font-semibold'>{data.news.length} Articles</h1>

  //     <article className='flex justify-center items-center gap-x-4'>
  //       <div className='bg-white h-fit flex items-center justify-center gap-x-2 px-2 rounded-lg border-blue/50 border-[1px]'>
  //         <Search size={35} className='py-2 stroke-gray-800 stroke-[1.5px]' />
  //         <input className='text-[12px] outline-none h-10 w-40 placeholder:text-[12px] ' type="text" name='query' id='query' autoFocus placeholder='Cari artikel' onChange={(e) => setIsSearch(e.target.value)} value={isSearch} autoComplete='off'/>
  //         <X size={35} className={`py-2 stroke-red-800 stroke-[1.5px] ${isSearch ? 'visible' : 'invisible'}`} onClick={() => setIsSearch("")} />
  //       </div>

  //       <div>
  //         <select name="type" id="type" className='h-10 rounded-lg px-4 outline-none text-[12px] border-blue/50 border-[1px]'  onChange={e => setFilter(e.target.value)} defaultValue={filter}>
  //           <option value="" className='text-[12px]'>All</option>
  //           <option value="Diabetes">diabetes</option>
  //           <option value="Obesitas">obesitas</option>
  //         </select>
  //       </div>
  //     </article>
  //   </section>
  
  //   <section className='w-full grid grid-cols-4 place-items-stretch gap-y-4 gap-x-6 my-10'>

  //     {data.news.length === 0 ? (
  //       <div className='w-full col-span-3'>
  //         <h1 className='text-2xl font-medium mb-6'>Tidak ada artikel untuk ditampilkan</h1>
  //         <Link to='/admin/dashboard/create' className=' bg-blue py-2 px-10 rounded-md text-sm cursor-default'>Buat artikel</Link>
  //       </div>
  //     ) : null} 



  //    {data.news.filter((item) => {
  //       if (filter) {
  //         return item.jenisArtikel === filter
  //       }
  //       return item
  //    }).map((item, index) => {
  //     return <ArticleCards url={`/admin/dashboard/news/${item.judulArtikel}`} key={index} {...item} isBgWhite={true}>
  //       <div className='flex gap-x-4 justify-end py-2'>
          
  //         <Link to={`/admin/dashboard/news/edit/${item.judulArtikel}`} className='cursor-default'> 
  //           <FilePenLine className="stroke-[1.5px] w-6 h-6 mb-2 stroke-blue" />
  //         </Link>

  //         <Form method='POST'>
  //           <input type="hidden" name='id' value={item._id} />
  //           <button type="submit"><Trash2 className="stroke-[1.5px] w-6 h-6 mb-2 stroke-red-400" /> </button>
  //         </Form>
  //       </div>
  //     </ArticleCards>
  //    })}
  //   </section>
  // </div>
import { useState, useEffect } from 'react'
import { Search, X, LoaderCircle } from 'lucide-react'
import customFetch from '../utils/customFetch'
import { ArticleCardsUser } from '../components'
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDashboardContext } from './DashboardLayout'

export const loader = async({ request}) => {

  const url = new URL(request.url)
  const judul = url.searchParams.get("judul")

  let newsUrl = judul !== null ? `/news/judul=${judul}` : '/news'

  try {
    const { data } = await customFetch.get(newsUrl)
    return data
  } catch (error) {
    console.log(error);
    return error
  }
}

export const action = async({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  let url = data.type === 'bookmark' ? '/news/bookmark' : '/news/favorite'
  let submittingType = data.type === 'bookmark' ? 'Artikel disimpan!' : 'Artikel ditambahkan ke daftar suka'

  try {
    await customFetch.post(url, data);
    toast.success(submittingType)
  } catch (error) {
    console.log(error.response.data.msg);
    toast.error('Terjadi kesalahan')
  }
}

const NewsPage = () => {

  const { data } = useLoaderData()
  const { data : userData } = useDashboardContext()
  const navigate = useNavigate()
  const isLoading = useNavigation().state === 'loading'
  const [debouncedQuery, setDebounceQuery] = useState('')
  const [isSearch, setIsSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (debouncedQuery) {
      navigate(`?judul=${encodeURIComponent(debouncedQuery)}`)
    } else {
      navigate("/dashboard")
    }
  }, [debouncedQuery, navigate])

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
        <h1 className='text-3xl text-slate-800 font-semibold'>Jelajahi Artikel Anda tentang Diabetes dan Obesitas</h1>
        <p className='text-slate-600 w-[80%] mt-2'>Semua informasi yang Anda butuhkan ada di sini. Jelajahi yang dirancang untuk membantu Anda memahami, mencegah, dan mengelola obesitas serta diabetes dengan lebih baik.</p>

        {/* FILTER SECTION */}
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

        {/* NEWS SECTION */}
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
                return <ArticleCardsUser key={index} {...item} bookmark={userData.user?.bookmark} favorite={userData.user?.favorite} />
              })
          )}

        </article>
      </section>  
    </section>
  )
}

export default NewsPage
// <div className='w-full  h-full flex flex-col overflow-y-auto p-10'>

//   <section className="w-full flex justify-between items-center ">
//     <h1 className='text-2xl font-semibold'>{data.news.length} Articles</h1>

//     <article className='flex justify-center items-center gap-x-4'>
//       <div className='bg-white h-fit flex items-center justify-center gap-x-2 px-2 rounded-lg border-blue/50 border-[1px]'>
//         <Search size={35} className='py-2 stroke-gray-800 stroke-[1.5px]' />
//         <input className='text-[12px] outline-none h-12 w-40 placeholder:text-[12px]' autoFocus autoComplete='off' type="text" name='query' id='query' placeholder='search articel' onChange={(e) => setIsSearch(e.target.value)} value={isSearch}/>
//         <X size={35} className={`py-2 stroke-red-800 stroke-[1.5px] ${isSearch ? 'visible' : 'invisible'}`} onClick={() => setIsSearch("")} />
//       </div>

//       <div>
//         <select name="type" id="type" className='h-12 rounded-lg px-4 outline-none text-[12px] border-blue/50 border-[1px]'  onChange={e => setFilter(e.target.value)} defaultValue={filter}>
//           <option value="" className='text-[12px]'>All</option>
//           <option value="Diabetes">diabetes</option>
//           <option value="Obesitas">obesitas</option>
//         </select>
//       </div>
//     </article>
//   </section>

//   <section className='w-full grid grid-cols-4 gap-y-4 place-items-center gap-x-6 my-10'>
//    
//   </section>
// </div>

// <ArticelCards url={`/dashboard/news/${item.judulArtikel}`} key={index} {...item} isBgWhite={true}>
//                 <div className='flex gap-x-4 justify-end'>
                  
//                   <Form method='POST' className={`h-fit bg- rounded-md ${ userData.user.bookmark?.includes(item._id) ? 'bg-blue' : 'bg-slate-400'} py-1 px-2`}>
//                     <input type="hidden" name='id' value={item._id} />
//                     <input type="hidden" name='type' value='bookmark' />
//                     <button type="submit"><BookMarked className="stroke-[1.5px] w-4 h-4 stroke-white" /> </button>
//                   </Form>
          
//                   <Form method='POST' className={`h-fit bg- rounded-md ${userData.user.favorite.includes(item._id) ? 'bg-pink-400' : 'bg-slate-400'} py-1 px-2`}>
//                     <input type="hidden" name='id' value={item._id} />
//                     <input type="hidden" name='type' value='favorite' />
//                     <button type="submit"><ThumbsUp className="stroke-[1.5px] w-4 h-4 stroke-white" /> </button>
//                   </Form>
//                 </div>
//               </ArticelCards>
import { useState, useEffect } from 'react'
import { articleData } from '../utils/constants'
import { Search, X, Trash2, BookMarked, ThumbsUp } from 'lucide-react'
import ArticelCards from '../components/ArticelCards'
import customFetch from '../utils/customFetch'
import { useLoaderData, useNavigate, useNavigation, Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDashboardContext } from './DashboardLayout'
import { Loading } from '../components'

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
  let isInBookmark = false;
  let isInFavorite = false;

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

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='w-full  h-full flex flex-col overflow-y-auto p-10'>

      <section className="w-full flex justify-between items-center ">
        <h1 className='text-2xl font-semibold'>{data.news.length} Articles</h1>

        <article className='flex justify-center items-center gap-x-4'>
          <div className='bg-white h-fit flex items-center justify-center gap-x-2 px-2 rounded-lg border-blue/50 border-[1px]'>
            <Search size={35} className='py-2 stroke-gray-800 stroke-[1.5px]' />
            <input className='text-[12px] outline-none h-12 w-40 placeholder:text-[12px]' autoFocus autoComplete='off' type="text" name='query' id='query' placeholder='search articel' onChange={(e) => setIsSearch(e.target.value)} value={isSearch}/>
            <X size={35} className={`py-2 stroke-red-800 stroke-[1.5px] ${isSearch ? 'visible' : 'invisible'}`} onClick={() => setIsSearch("")} />
          </div>

          <div>
            <select name="type" id="type" className='h-12 rounded-lg px-4 outline-none text-[12px] border-blue/50 border-[1px]'  onChange={e => setFilter(e.target.value)} defaultValue={filter}>
              <option value="" className='text-[12px]'>All</option>
              <option value="Diabetes">diabetes</option>
              <option value="Obesitas">obesitas</option>
            </select>
          </div>
        </article>
      </section>
    
      <section className='w-full grid grid-cols-4 gap-y-4 place-items-center gap-x-6 my-10'>
       {data.news.filter((newItem) => {
        if (filter) {
          return newItem.jenisArtikel === filter
        } else {
          return articleData
        }
       }).map((item, index) => {
            
        if (userData.user?.bookmark?.length !== 0) {
          isInBookmark = userData.bookmark?.includes(item._id.toString())
        }

        if (userData.user?.favorite?.length !== 0) {
          isInFavorite = userData.favorite?.includes(item_id.toString())
        }
        
        return <ArticelCards url={`/dashboard/news/${item.judulArtikel}`} key={index} {...item} isBgWhite={true}>
          <div className='flex gap-x-4 justify-end'>
            
            <Form method='POST' className={`h-fit bg- rounded-md ${ userData.user.bookmark?.includes(item._id) ? 'bg-blue' : 'bg-slate-400'} py-1 px-2`}>
              <input type="hidden" name='id' value={item._id} />
              <input type="hidden" name='type' value='bookmark' />
              <button type="submit"><BookMarked className="stroke-[1.5px] w-4 h-4 stroke-white" /> </button>
            </Form>

            <Form method='POST' className={`h-fit bg- rounded-md ${userData.user.favorite.includes(item._id) ? 'bg-pink-400' : 'bg-slate-400'} py-1 px-2`}>
              <input type="hidden" name='id' value={item._id} />
              <input type="hidden" name='type' value='favorite' />
              <button type="submit"><ThumbsUp className="stroke-[1.5px] w-4 h-4 stroke-white" /> </button>
            </Form>
          </div>
        </ArticelCards>
       })}
      </section>
    </div>
  )
}

export default NewsPage
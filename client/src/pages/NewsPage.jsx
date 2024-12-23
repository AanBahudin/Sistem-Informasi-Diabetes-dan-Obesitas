import { useState } from 'react'
import { articleData } from '../utils/constants'
import { Search, X } from 'lucide-react'
import ArticelCards from '../components/ArticelCards'

const NewsPage = () => {

  const [isSearch, setIsSearch] = useState('');
  console.log(isSearch);
  
  
  return (
    <div className='w-full  h-full flex flex-col overflow-y-auto pt-10'>

      <section className="w-full flex px-10 justify-between items-center">
        <h1 className='text-2xl font-semibold'>1043 Articles</h1>

        <article className='flex justify-center items-center gap-x-4'>
          <div className='bg-white h-fit flex items-center justify-center gap-x-2 px-2 rounded-lg border-blue/50 border-[1px]'>
            <Search size={35} className='py-2 stroke-gray-800 stroke-[1.5px]' />
            <input className='text-[12px] outline-none h-12 w-40 placeholder:text-[12px] ' type="text" name='query' id='query' placeholder='search articel' onChange={(e) => setIsSearch(e.target.value)} value={isSearch}/>
            <X size={35} className={`py-2 stroke-gray-800 stroke-[1.5px] ${isSearch ? 'visible' : 'invisible'}`} onClick={() => setIsSearch("")} />
          </div>

          <div>
            <select name="type" id="type" className='h-12 rounded-lg px-4 outline-none text-[12px] border-blue/50 border-[1px]' >
              <option value="" disabled selected className='text-[12px]'>article type</option>
              <option value="diabetes">diabetes</option>
              <option value="obesitas">obesitas</option>
            </select>
          </div>
        </article>
      </section>
    
      <section className='w-full grid grid-cols-4 gap-y-4 place-items-center my-20'>
       {articleData.slice(0, 8).map((item, index) => {
        return <ArticelCards key={index} {...item} isBgWhite={true} />
       })}
      </section>
    </div>
  )
}

export default NewsPage
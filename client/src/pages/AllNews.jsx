import React, { useState } from 'react'
import { Search, X, FilePenLine, Trash2 } from 'lucide-react'
import { articleData } from '../utils/constants'
import { ArticleCards } from '../components'


const AllNews = () => {

  const [isSearch, setIsSearch] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <div className='w-full  h-full flex flex-col overflow-y-auto p-10'>

    <section className="w-full flex justify-between items-center border-b-[1px] py-2 border-grey/50">
      <h1 className='text-2xl font-semibold'>1043 Articles</h1>

      <article className='flex justify-center items-center gap-x-4'>
        <div className='bg-white h-fit flex items-center justify-center gap-x-2 px-2 rounded-lg border-blue/50 border-[1px]'>
          <Search size={35} className='py-2 stroke-gray-800 stroke-[1.5px]' />
          <input className='text-[12px] outline-none h-12 w-40 placeholder:text-[12px] ' type="text" name='query' id='query' placeholder='search articel' onChange={(e) => setIsSearch(e.target.value)} value={isSearch}/>
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
     {articleData.slice(0, 12).filter((newItem) => {
      if (filter) {
        return newItem.type === filter
      } else {
        return articleData
      }
     }).map((item, index) => {
      return <ArticleCards key={index} {...item} isBgWhite={true}>
        <div className='flex gap-x-4 justify-end py-2'>
          <FilePenLine className="stroke-[1.5px] w-6 h-6 mb-2 stroke-blue" />
          <Trash2 className="stroke-[1.5px] w-6 h-6 mb-2 stroke-red-400" />
        </div>
      </ArticleCards>
     })}
    </section>
  </div>
  )
}

export default AllNews
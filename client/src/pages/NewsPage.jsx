import React from 'react'
import { articleData } from '../utils/constants'
import ArticelCards from '../components/ArticelCards'

const NewsPage = () => {
  return (
    <div className='w-full  h-full flex flex-col overflow-y-auto pt-10'>
      <section className='w-full grid grid-cols-4 gap-y-4 place-items-center'>
       {articleData.slice(0, 8).map((item, index) => {
        return <ArticelCards key={index} {...item} isBgWhite={true} />
       })}
      </section>
    </div>
  )
}

export default NewsPage
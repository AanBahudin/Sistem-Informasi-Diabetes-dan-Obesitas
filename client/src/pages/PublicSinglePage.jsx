import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import React, { useState } from 'react'
import { ChevronDown, Home } from 'lucide-react'
import { toast } from 'react-toastify'
import { convertFromRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'


export const loader = async({ params }) => {
  try {
    const { data } = await customFetch.get(`/news/${params.id}`)
    return data
  } catch (error) {
    toast.error(error.response.data.msg)
    return error
  }
}

const PublicSinglePage = () => {

  const { news : data } = useLoaderData()
  const newsData = convertFromRaw(JSON.parse(data.editorContent))
  const showNews = EditorState.createWithContent(newsData)
  const [showReference, setShowReference] = useState(false);
  const tags = data.tagar.split(' ');

  return (
    <div className='w-[80%] mx-auto py-20 bg-white px-10 mt-28'>

      <section className='w-full bg-slate-200 flex items-center justify-start px-14 mx-auto gap-x-6 p-4 rounded-md mb-20'>
        <Home className='w-5 h-5 stroke-slate-600 mr-4' />
        <p className='text-sm'>Homepage</p>
        <p className='text-sm'>/</p>
        <p className='text-sm font-semibold text-blue'>Artikel</p>
      </section>

      <div className='flex gap-x-4'>
        <h5 className='bg-blue round-full w-fit font-medium px-4 rounded-full py-2 text-small text-white'>{data.tagArtikel}</h5>
        <h5 className='bg-blue round-full w-fit font-medium px-4 rounded-full py-2 text-small text-white'>{data.jenisArtikel}</h5>
      </div>

      <Editor editorState={showNews} toolbarHidden readOnly />
      <p className='mt-10'>Terakhir kali diperbaharui : 23 September 2023</p>
      <p className='my-2'>Ditinjau Oleh : {data.penyutingArtikel}</p>
      <p className='flex gap-x-2' onClick={() => setShowReference(!showReference)}>
        Referensi
        <ChevronDown className={`stroke-gray-500/50  ${showReference ? 'rotate-180' : ''} duration-200 ease-in-out`} />
      </p>

      <div className={`w-[80%] border-[1px] border-gray-700/50 rounded-md px-2 py-4 mt-2 text-medium ${ showReference ? 'min-h-[30vh]' : 'hidden text-[0px] h-0'} duration-200 ease-in-out`}>
       {data.referensi}
      </div>

      <div className='w-full mt-6'>
        <h1 className='text-grey/70 italic'>tags</h1>

        <div className='w-full flex flex-wrap gap-x-4 mt-4'>
          {tags.map((item, index) => {
            return <p key={index} className='text-white bg-blue py-2 px-4 italic rounded-full text-[12px]'>{item}</p>
          })}
        </div>
      </div> 
    </div>
  )
}

export default PublicSinglePage
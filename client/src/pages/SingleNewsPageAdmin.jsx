import React, { useState } from 'react'
import { sehatPhoto } from "../assets/images"
import { ChevronDown } from 'lucide-react'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

export const loader = async({params}) => {
    try {
        const {data} = await customFetch.get(`/news/${params.id}`)
        return data;
    } catch (error) {
        toast.error('Terjadi kesalahan!')
        return error
    }
}

const SingleNewsPageAdmin = () => {

  const { news : data } = useLoaderData();
  const newsData = convertFromRaw(JSON.parse(data.editorContent))
  const showNews = EditorState.createWithContent(newsData)
  console.log(showNews);
  

  const [showReference, setShowReference] = useState(false);

  return (
    <div className='w-[80%] mx-auto py-20 bg-white px-10'>
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

      <div className={`w-[80%] border-[1px] border-gray-700/50 rounded-md px-2 py-4 mt-2 text-medium ${ showReference ? 'visible' : 'hidden' }`}>
       {data.referensi}
      </div>
    </div>
  )
}

export default SingleNewsPageAdmin
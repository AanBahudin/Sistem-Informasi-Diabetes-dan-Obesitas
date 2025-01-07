import ArticelCards from "../components/ArticelCards"
import customFetch from '../utils/customFetch'
import { Trash } from 'lucide-react'
import { redirect, useLoaderData, Form } from "react-router-dom"
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
  
  return (
    <div className='w-full h-full flex flex-col overflow-y-auto p-10'>
      <h1 className='text-2xl font-semibold'>Artikel yang disimpan</h1>

      { bookmarked.length === 0 ? (
          <div className="mt-10">
            <h1 className="text-slate-700 font-medium text-xl">tidak ada artikel yang disukai</h1>
          </div>
      ) : (
        <section className="w-full grid grid-cols-4 place-items-center gap-x-6 gap-y-4 my-10">
          {bookmarked.map((item, index) => {
            return (
              <ArticelCards url={`/dashboard/news/${item.judulArtikel}`} key={index} {...item} isBgWhite={true}>
                <Form method='POST' className='h-fit w-fit rounded-md bg-red-300 py-1 px-2'>
                  <input type="hidden" name='id' value={item._id} />
                  <button type="submit"><Trash className="stroke-[1.5px] w-4 h-4 stroke-white" /> </button>
                </Form>
              </ArticelCards>
            )
          })}
        </section>
      ) }

    </div>
  )
}

export default BookmarkPage
import ArticelCards from "../components/ArticelCards"
import customFetch from '../utils/customFetch'
import { useLoaderData } from "react-router-dom"

export const loader = async() => {
  try {
    const { data } = await customFetch.get('/news/bookmark')
    return data
  } catch (error) {
    console.log(error.response.data.msg);
    return data
  }
}

const BookmarkPage = () => {

  const { bookmarked } = useLoaderData()
  
  return (
    <div className='w-full h-full flex flex-col overflow-y-auto p-10'>
      <h1 className='text-2xl font-semibold'>Artikel yang disimpan</h1>

      { !bookmarked ? (
          <div className="mt-10">
            <h1 className="text-slate-700 font-medium text-xl">tidak ada artikel yang disukai</h1>
          </div>
      ) : (
        <section className="w-full grid grid-cols-4 place-items-center gap-x-6 gap-y-4 my-10">
          {bookmarked.map((item, index) => {
            return <ArticelCards key={index} {...item} isBgWhite={true}>
            </ArticelCards>
          })}
        </section>
      ) }

    </div>
  )
}

export default BookmarkPage
import ArticelCards from "../components/ArticelCards"
import { Heart } from "lucide-react"
import customFetch from "../utils/customFetch"
import { useLoaderData } from "react-router-dom"

export const loader = async() => {
  try {
    const { data } = await customFetch.get('/news/favorite')
    return data
  } catch (error) {
    console.log(error.response.data.msg);
    return error
  }
}

export const action = async({ request }) => {
  try {
    const data = Object.fromEntries(await request.formData())
    console.log(data);
  } catch (error) {
    console.log(error.response.data.msg);
    return error
  }
}

const FavoritePage = () => {

  const { favorited } = useLoaderData()
  
  return (
    <div className='w-full h-full flex flex-col overflow-y-auto p-10'>
      <h1 className='text-2xl font-semibold'>Artikel yang disukai</h1>


      {!favorited ? (
        <div className="mt-10">
          <h1 className="text-slate-700 font-medium text-xl">tidak ada artikel yang disukai</h1>
        </div>
      ) : (
        <section className="w-full grid grid-cols-4 place-items-center gap-6 my-10">
          {favorited.map((item, index) => {
            return <ArticelCards key={index} {...item} isBgWhite={true}>
              <Heart className="stroke-[1.5px] w-6 h-6 mb-2 ml-auto stroke-red-400 fill-red-400" />
            </ArticelCards>
          })}
        </section>
      )}
    </div>
  )
}

export default FavoritePage
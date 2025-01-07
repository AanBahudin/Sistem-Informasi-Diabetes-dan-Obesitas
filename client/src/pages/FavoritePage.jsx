import ArticelCards from "../components/ArticelCards"
import { BookmarkMinus, Heart, Trash } from "lucide-react"
import customFetch from "../utils/customFetch"
import { Form, redirect, useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"

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
    await customFetch.delete(`/news/favorite/${data.id}`)
    toast.success('Dihapus dari favorite')
    return redirect('.')
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


      {favorited.length === 0 ? (
        <div className="mt-10">
          <h1 className="text-slate-700 font-medium text-xl">tidak ada artikel yang disukai</h1>
        </div>
      ) : (
        <section className="w-full grid grid-cols-4 place-items-center gap-6 my-10">
          {favorited.map((item, index) => {
            return <ArticelCards key={index} {...item} isBgWhite={true}>
              <Form method='POST' className='h-fit w-fit rounded-md bg-red-300 py-1 px-2'>
                <input type="hidden" name='id' value={item._id} />
                <button type="submit"><Trash className="stroke-[1.5px] w-4 h-4 stroke-white" /> </button>
              </Form>
            </ArticelCards>
          })}
        </section>
      )}
    </div>
  )
}

export default FavoritePage
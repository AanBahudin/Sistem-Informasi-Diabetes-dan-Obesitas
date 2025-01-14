import { ArticleCards, ArticleCardsUser } from "../components"
import customFetch from "../utils/customFetch"
import { redirect, useLoaderData, useNavigation } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
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
  const isLoading = useNavigation().state === 'loading'
  console.log(favorited);
  
  

  return (
    <section className='w-full h-full overflow-y-auto p-10 flex items-center justify-center bg-slate-50'>
      <section className='w-full h-full '>
        <h1 className='text-3xl text-slate-800 font-semibold'>Halaman Favorit Anda</h1>
        <p className='text-slate-600 w-[80%] mt-2'>Kumpulan artikel yang Anda sukai. Akses konten favorit Anda dengan cepat di sini.</p>


        <article className={`w-full mt-10 flex flex-wrap items-stretch ${favorited.length < 4 ? 'justify-start' : 'justify-between'} gap-6`}>
        { isLoading ? (
            <div className='w-full flex-1 flex items-center justify-center gap-x-4'>
              <LoaderCircle className='w-6 h-6 stroke-slate-800 animate-spin' />
              <h1 className='text-center text-xl font-medium text-slate-700'>Sedang memuat artikel</h1>
            </div>

          ) : (
            favorited.length === 0 ? (
              <div className='w-full'>
                <h1 className='text-slate-700 font-medium'>Belum Ada Artikel yang Disukai</h1>
                <p className='text-sm text-slate-500 '>Temukan artikel yang menarik perhatian Anda, lalu tandai sebagai favorit untuk akses yang lebih mudah di kemudian hari</p>
              </div>
            ) : (
              favorited.map((item, index) => {
                  return <ArticleCards {...item} key={index} isInPage='favorite'/>
                })
            )
          )}
        </article>
      </section>  
    </section>
  )
}

export default FavoritePage
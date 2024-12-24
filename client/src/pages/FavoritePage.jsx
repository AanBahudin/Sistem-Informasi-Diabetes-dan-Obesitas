import ArticelCards from "../components/ArticelCards"
import { articleData } from "../utils/constants"
import { Heart } from "lucide-react"

const FavoritePage = () => {
  return (
    <div className='w-full h-full flex flex-col overflow-y-auto p-10'>
      <h1 className='text-2xl font-semibold'>Artikel yang disukai</h1>

      <section className="w-full grid grid-cols-4 place-items-center gap-6 my-10">
        {articleData.slice(0, 5).map((item, index) => {
          return <ArticelCards key={index} {...item} isBgWhite={true}>
            <Heart className="stroke-[1.5px] w-6 h-6 mb-2 ml-auto stroke-red-400 fill-red-400" />
          </ArticelCards>
        })}
      </section>
    </div>
  )
}

export default FavoritePage
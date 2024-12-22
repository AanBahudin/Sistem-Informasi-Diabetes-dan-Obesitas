import { articleData } from "../../utils/constants"
import {ArticleCards} from '../../components'

const Article = () => {
  return (
    <div id='article' className="w-full my-20">
      <h1 className="text-4xl font-medium text-center mb-6">Artikel Terbaru</h1>
      <p className="text-center mx-auto w-[60%]">Dapatkan wawasan terbaru dan tips praktis seputar kesehatan, gaya hidup, dan pencegahan diabetes serta obesitas. Artikel-artikel kami dirancang untuk membantu Anda membuat keputusan yang lebih sehat setiap hari.</p>

      {/* CARDS CONTAINER */}
      <div className="w-[80%] mt-6 grid grid-cols-3 gap-4 mx-auto items-center justify-center flex-wrap">
        {articleData.slice(0, 6).map((item, index) => {
          return <ArticleCards key={index} {...item} isBgWhite={false}/>
        })}
      </div>
    </div>
  )
}

export default Article
import { articleData } from "../../utils/constants"
import {ArticleCards} from '../../components'
import { Link } from "react-router-dom"

const Article = ({ data=[] }) => {

  if (data.length > 6) {
    data.slice(0,6)
  }

  return (
    <div id='article' className="w-full my-20 flex items-center flex-col">
      <h1 className="text-4xl font-medium text-center mb-6">Artikel Terbaru</h1>
      <p className="text-center mx-auto w-[60%]">Dapatkan wawasan terbaru dan tips praktis seputar kesehatan, gaya hidup, dan pencegahan diabetes serta obesitas. Artikel-artikel kami dirancang untuk membantu Anda membuat keputusan yang lebih sehat setiap hari.</p>

      {/* CARDS CONTAINER */}
      <div className="w-[80%] mt-6 grid grid-cols-3 gap-4 mx-auto">
        {data.map((item, index) => {
          return <ArticleCards url={`/artikel/${item.judulArtikel}`} key={index} {...item} isBgWhite={false} />
        })}
      </div>

      <Link to='/artikel' className="text-center w-fit bg-blue/80 px-8 py-2 mx-auto mt-8 cursor-default rounded-md text-sm">Semua artikel</Link>
    </div>
  )
}

export default Article
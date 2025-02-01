import { Link } from "react-router-dom"
import {ArticleCardPublic, ArticleCards} from '../../components'

const Article = ({ data=[] }) => {

  if (data.length > 6) {
    data.slice(0,6)
  }

  return (
    <div id='article' className="w-full my-20 flex items-center flex-col">
      <h1 className="text-4xl font-semibold text-slate-800 text-center mb-6">Artikel Terbaru</h1>
      <p className="text-center mx-auto w-[60%] text-slate-700">Dapatkan wawasan terbaru dan tips praktis seputar kesehatan, gaya hidup, dan pencegahan diabetes serta obesitas. Artikel-artikel kami dirancang untuk membantu Anda membuat keputusan yang lebih sehat setiap hari.</p>

      {/* CARDS CONTAINER */}
      <div className="w-[80%] mt-4 flex items-center justify-z gap-x-6 flex-wrap">
        {data.map((item, index) => {
          return <ArticleCardPublic key={index} {...item} />
        })}
      </div>

      <Link to='/artikel' className="text-center w-fit bg-blue/80 text-slate-700 px-8 py-2 mx-auto mt-8 cursor-default rounded-md text-sm">Semua artikel</Link>
    </div>
  )
}

export default Article
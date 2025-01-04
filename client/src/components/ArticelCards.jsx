import { sehatPhoto } from "../assets/images"
import { Link } from 'react-router-dom' 
import moment from 'moment'

const ArticelCards = ({children, thumbnail = '', judulArtikel, deskripsi='', createdAt, jenisArtikel, isBgWhite, url }) => {

  const newDate = moment(createdAt, "YYYYMMDD").fromNow();

  return (
    <Link to={`/admin/dashboard/news/${judulArtikel}`} className="text-grey no-underline">
      <article className={`${ isBgWhite === true ? 'bg-white' : 'bg-lightGrey' } rounded-md max-w-[300px] p-4 hover:shadow-2xl duration-200 ease-in-out`}>
          <span>
            {children}
          </span>
          <img className='w-full rounded-sm h-40 object-fill' src={thumbnail} alt="" />
          <h5 className='text-[14px] my-2 font-semibold text-grey no-underline truncate'>{judulArtikel}</h5>
          <p className='text-[12px]'>{deskripsi.slice(0,95) + '....'}</p>
          
          <div className='w-full flex items-center justify-between mt-2'>
              <p className='text-[10px] text-gray-400'>{ newDate }</p>
              <p className='text-[10px] bg-blue text-white py-1 px-2 rounded-xl'>{jenisArtikel}</p>
          </div>
      </article>
    </Link>
  )
}

export default ArticelCards
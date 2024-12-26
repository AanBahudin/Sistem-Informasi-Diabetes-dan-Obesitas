import { sehatPhoto } from "../assets/images"
import { Link } from 'react-router-dom' 

const ArticelCards = ({children, photo = '', title, caption, published, type, isBgWhite }) => {
  return (
    <Link to='/dashboard/news/5-tips-kebiasaan-yang-dapat-menurunkan-lemak-pada-tubuh'>
      <article className={`${ isBgWhite === true ? 'bg-white' : 'bg-lightGrey' } rounded-md max-w-[300px] p-4 hover:shadow-2xl duration-200 ease-in-out`}>
          <span>
            {children}
          </span>
          <img className='w-full rounded-sm' src={sehatPhoto} alt="" />
          <h5 className='text-[14px] my-2 font-semibold'>{title}</h5>
          <p className='text-[12px]'>{caption}</p>
          
          <div className='w-full flex items-center justify-between mt-2'>
              <p className='text-[10px] text-gray-400'>{ published }</p>
              <p className='text-[10px] bg-blue text-white py-1 px-2 rounded-xl'>{type}</p>
          </div>
      </article>
    </Link>
  )
}

export default ArticelCards
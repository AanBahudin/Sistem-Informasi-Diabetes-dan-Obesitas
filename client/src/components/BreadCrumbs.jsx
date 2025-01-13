import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'

const BreadCrumbs = ({isSinglePage}) => {

    const location = useLocation()
    let detailUrl = ''

    // console.log(location.pathname.slice(1).split('/'));
    const currentUrl = location.pathname.split('/');

    if (currentUrl.length === 3) {
        detailUrl = currentUrl[2].replaceAll('%20', ' ')
    }
        
  return (
     <section className={`w-full bg-slate-200 flex items-center justify-start px-14 ${isSinglePage ? 
     'mt-14' : 'mt-32'} mx-auto gap-x-6 p-4 rounded-md`}>
        <Link to='/'> <Home className='w-5 h-5 stroke-slate-600 mr-4' /> </Link>
        <Link to='/' className='text-sm cursor-default'>Homepage</Link>
        <p className='text-sm'>/</p>
        <Link to='/artikel' className={`text-sm  ${detailUrl !== '' ? null : 'text-blue font-semibold'}`}>Artikel</Link>

        {detailUrl !== '' ? (
            <>
                <p className='text-sm'>/</p>
                <p className={`text-sm font-semibold ${detailUrl !== '' ? 'text-blue' : null}`}>{detailUrl}</p>
            </>
        ) : null}
    </section>  
  )
}

export default BreadCrumbs
import { methodPhoto } from '../../assets/images'
import { methods } from '../../utils/constants'
import MethodCard from './MethodCard'
import { Link } from 'react-router-dom'

const Methods = () => {
  return (
    <div id='services' className='max-w-full mx-auto flex items-start justify-start my-20'>
        <img className='h-[600px]' src={methodPhoto} alt="" />

        <section>
          <h5 className='text-blue/80 font-medium tracking-wider'>METODE</h5>
          <h1 className='font-semibold text-4xl mb-5 mt-2 text-slate-700 '>Kami Menawarkan Pendampingan <br />dari <span className="text-blue/80">Ahli</span> Berpengalaman</h1>
          <p className='w-[700px] text-slate-700'>Setiap langkah kecil memiliki dampak besar dalam mencegah obesitas dan diabetes. Kami menggunakan pendekatan yang terarah, berbasis ilmiah, dan mudah diterapkan untuk membantu Anda memulai perjalanan menuju kesehatan yang lebih baik. Temukan metode kami yang telah dirancang untuk mendukung perubahan gaya hidup Anda.</p>

          <div className='grid grid-cols-2 my-6 gap-4'>
              {methods.map((item, index) => {
                  return <MethodCard key={index} {...item} />
              })}
          </div>

          <Link to='/login' className='bg-blue/80 no-underline text-grey cursor-default px-8 py-2 rounded-md'>
            Start now
          </Link>
        </section>
    </div>
  )
}

export default Methods
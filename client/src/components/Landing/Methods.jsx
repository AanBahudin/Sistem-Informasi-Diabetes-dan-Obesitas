import { methodPhoto } from '../../assets/images'
import { methods } from '../../utils/constants'
import MethodCard from './MethodCard'

const Methods = () => {
  return (
    <div id='services' className='max-w-full mx-auto flex items-start justify-start my-20'>
        <img className='h-[600px]' src={methodPhoto} alt="" />

        <section>
          <h5 className='text-blue tracking-wider'>METODE</h5>
          <h1 className='font-medium text-4xl mb-5 mt-2'>Kami Menawarkan Pendampingan <br />dari <span className="text-blue">Ahli</span> Berpengalaman</h1>
          <p className='w-[700px]'>Setiap langkah kecil memiliki dampak besar dalam mencegah obesitas dan diabetes. Kami menggunakan pendekatan yang terarah, berbasis ilmiah, dan mudah diterapkan untuk membantu Anda memulai perjalanan menuju kesehatan yang lebih baik. Temukan metode kami yang telah dirancang untuk mendukung perubahan gaya hidup Anda.</p>

          <div className='grid grid-cols-2 my-6 gap-4'>
              {methods.map((item, index) => {
                  return <MethodCard key={index} {...item} />
              })}
          </div>

          <button className='bg-blue px-8 py-2 rounded-md'>
            Start now
          </button>
        </section>
    </div>
  )
}

export default Methods
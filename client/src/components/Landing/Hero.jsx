import {Route} from 'lucide-react'
import { heroPhoto } from '../../assets/images'

const Hero = () => {
  return (
    <div className="w-full h-[95vh] py-10 px-20 flex items-center justify-start bg-[url('/src/assets/images/hero.png')] bg-cover bg-no-repeat bg-center">
      <section>
          <h1 className='text-5xl font-semibold leading-normal mt-4'>Cegah Obesitas dan Diabetes<br/> Wujudkan Hidup Berkualitas</h1>
          <p className='mt-4 text-grey'>Temukan panduan lengkap, edukasi, dan solusi untuk mencegah obesitas dan diabetes.<br/> Bersama, kita bisa menciptakan gaya hidup yang lebih sehat dan berkualitas.</p>

          <div className='flex gap-x-4'>
              <a className='mt-6 no-underline text-grey bg-white px-[42px] py-[12px] rounded-md font-medium hover:shadow-lg duration-200 ease-in-out cursor-default'>
                  Start Now
              </a>
              <a href='#partnership' className=' mt-6 no-underline text-grey bg-white px-[42px] py-[12px] rounded-md font-medium hover:shadow-lg duration-200 ease-in-out cursor-default'>Learn More</a>
          </div>
      </section>
    </div>
  )
}

export default Hero
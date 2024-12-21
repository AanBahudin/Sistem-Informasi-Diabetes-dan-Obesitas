import { Quote } from 'lucide-react'
import { userPhoto } from '../../assets/images'

const TestimonialCard = ({ name, username, message, photo }) => {
  return (
    <div className='bg-lightGrey p-5 rounded-lg max-w-[360px] shadow-md hover:shadow-2xl ease-in-out duration-200 flex flex-col justify-between'>
      <Quote size={30} className='stroke-blue rotate-180'/>
      <p className='my-4 text-[14px] cursor-default italic'>{message}</p>

      <div className='flex items-center gap-x-4'>
        <img className='w-10 h-10 bg-white rounded-full object-cover' src={photo} alt="" />

        <article className='self-end'>
          <h5 className='text-grey tracking-tighter text-sm font-semibold cursor-default'>{name}</h5>
          <p className='text-[12px] -mt-1 cursor-default'>@{username}</p>
        </article>
      </div>
      </div>
  )
}

export default TestimonialCard
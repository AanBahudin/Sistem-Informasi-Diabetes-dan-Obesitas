import { Quote } from 'lucide-react'

const TestimonialCard = ({ name, username, message, photo }) => {
  return (
    <div className='bg-slate-100 p-5 rounded-lg max-w-[360px] shadow-md hover:shadow-2xl ease-in-out duration-200 flex flex-col justify-between'>
      <Quote size={30} className='stroke-blue/80 rotate-180'/>
      <p className='my-4 text-[14px] cursor-default italic text-slate-700'>{message}</p>

      <div className='flex items-center gap-x-4'>
        <img className='w-10 h-10 bg-white rounded-full object-cover' src={photo} alt="" />

        <article className='self-end'>
          <h5 className='text-slate-900 tracking-tighter text-sm font-semibold cursor-default'>{name}</h5>
          <p className='text-[12px] -mt-1 cursor-default text-slate-700'>@{username}</p>
        </article>
      </div>
      </div>
  )
}

export default TestimonialCard
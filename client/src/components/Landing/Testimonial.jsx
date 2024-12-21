import React from 'react'
import TestimonialCard from './TestimonialCard'
import { testimonial } from '../../utils/constants'

const Testimonial = () => {
  return (
    <div className='w-full'>
      <h1 className='text-4xl font-medium '>Apa <span className='text-blue'>kata</span> mereka tentang kami?</h1>
      <p className='text-grey w-[50rem] mt-5 my-10'>Inilah pandangan dari mereka yang telah menjadikan website kami sebagai panduan utama dalam pencegahan diabetes dan obesitas. Temukan inspirasi dan motivasi untuk menjalani hidup lebih sehat.</p>

      <section className='flex items-stretch justify-center flex-wrap gap-x-7 gap-y-7'>
        {testimonial.map((item, index) => {
          return (
            <TestimonialCard key={index} {...item} />
          )
        })}
        
      </section>
    </div>
  )
}

export default Testimonial
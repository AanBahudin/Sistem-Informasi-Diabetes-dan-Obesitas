import React from 'react'
import { Navbar, Footer } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { About, Contact, Hero, Tagline, Services, Testimonial, Method, Narasumber, Partnership, Article, Dukungan } from '../components/Landing'

export const action = async({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/message', data);
    toast.success('Message is sent!')
    return 'data';
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }
}

const Landing = () => {
  return (
    <section className=' m-auto flex flex-col items-center my-auto relative '>
      
      <Hero />
      <div className="w-[90vw]">
          <Partnership />
          <About />
          <Dukungan />
          <Method />
          <Narasumber />
          <Article />
          <Testimonial />
          <Tagline />
          {/* <Services /> */}
          <Contact />
          <Footer />
      </div>
    </section>
  )
}

export default Landing
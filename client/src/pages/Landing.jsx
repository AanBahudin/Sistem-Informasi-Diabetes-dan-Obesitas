import React from 'react'
import { Navbar } from '../components'
import { About, Contact, Hero, Tagline, Services, Testimonial, Method, Narasumber, Partnership, Article, Dukungan } from '../components/Landing'

const Landing = () => {


  return (
    <section className=' m-auto flex flex-col items-center my-auto relative '>
      <Navbar />
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
      </div>
    </section>
  )
}

export default Landing
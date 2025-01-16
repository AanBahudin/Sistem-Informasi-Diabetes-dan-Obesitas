import React from 'react'
import { Navbar, Footer, Loading } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { About, Contact, Hero, Tagline, Services, Testimonial, Method, Narasumber, Partnership, Article, Dukungan } from '../components/Landing'
import { useLoaderData, useNavigation } from 'react-router-dom'

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

export const loader = async() => {
  try {
    const { data } = await customFetch.get('/news')
    return data
  } catch (error) {
    console.log(error.response.data.msg);
    toast.error('Terjadi kesalahan')
    return error
  }
}

const Landing = () => {

  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  const { news: data } = useLoaderData();
  

  if (isLoading) {
    return <Loading />
  }
  
  return (
    <section className=' m-auto flex flex-col items-center my-auto relative bg-white'>
      
      <Hero />
      <div className="w-[90vw]">
          <Partnership />
          <About />
          <Dukungan />
          <Method />
          <Narasumber />
          <Article data={data} />
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
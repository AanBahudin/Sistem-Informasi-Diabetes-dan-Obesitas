import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components'

const HomeLayout = () => {
  return (
    <div>
      <section className='m-auto flex flex-col items-center my-auto relative'>
        <Navbar />
      </section>
      <Outlet />
    </div>
  )
}

export default HomeLayout
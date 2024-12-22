import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components'
import { useState, useContext, createContext } from 'react'


const HomeLayoutContext = createContext()

const HomeLayout = () => {



  return (
    <HomeLayoutContext.Provider value={{

    }}>
      <div>
        <section className='m-auto flex flex-col items-center my-auto relative'>
          <Navbar />
        </section>
        <Outlet />
      </div>
    </HomeLayoutContext.Provider>
  )
}

export const useHomelayoutContext = () => useContext(HomeLayoutContext)
export default HomeLayout
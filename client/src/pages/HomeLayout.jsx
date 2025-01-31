import React, { useState, createContext, useContext } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import { Navbar } from '../components'
import customFetch from '../utils/customFetch'

const HomelayoutContext = createContext();

export const loader = async() => {

  try {
    const { data } = await customFetch.get('/users/current-user')
    return data.user;
  } catch (error) {
    return null
  }
}

const HomeLayout = () => {

  const data = useLoaderData();
  
  return (
    <HomelayoutContext.Provider value={{
      data
    }}>
      <div>
        <section className='m-auto flex flex-col items-center my-auto relative'>
          <Navbar data={data} />
        </section>

        <Outlet />
      </div>
    </HomelayoutContext.Provider>

  )
}

export const useHomeLayoutContext = () => useContext(HomelayoutContext)
export default HomeLayout
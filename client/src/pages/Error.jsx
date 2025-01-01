import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className='w-full h-fullScreen flex flex-col items-center justify-evenly'>
      <h1 className='text-xl font-semibold '>E-Health</h1>

      <div className='w-full flex justify-center items-center flex-col'>
        <h2 className='text-5xl font-semibold text-blue'>Oops, Something is wrong</h2>
        <p className='w-[30%] mx-auto text-center text-sm mt-4 text-grey/80'>Ada yang salah di sisi kami.
        Kami sedang berusaha memperbaikinya secepat mungkin. Sementara itu, Anda bisa mencoba menyegarkan halaman atau kembali nanti.</p>

        <Link className='w-fit px-20 py-3 mt-10 rounded-md shadow-lg bg-blue text-white cursor-default'> Kembali Ke Home </Link>
      </div>
    </section>  
  )
}

export default Error
import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-full h-full flex flex-col justify-between py-10'>
        <h1>Title</h1>

        <div className='bg-green-500 flex flex-col items-center justify-center'>
          <h1>navigation</h1>
        </div>

        <h1>Logout</h1>
    </div>
  )
}

export default Sidebar
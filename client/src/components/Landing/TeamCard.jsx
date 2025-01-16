import React from 'react'
import { Instagram } from 'lucide-react'

const TeamCard = ({ name, username, spesialis, message, photo }) => {
  return (
    
    <div className='flex items-center gap-x-6 hover:ring-[2px] ring-none hover:ring-blue/80 rounded-xl p-2 h-fit flex-1 bg-slate-200/80 duration-200 ease-in-out hover:shadow-xl'>
        <div className='bg-slate-200 w-28 h-28 rounded-lg'>
            <img className='object-cover m-auto h-full w-[120px] rounded-md' src={photo} alt="" />
        </div>

        <article className='flex justify-start flex-col flex-1'>

            <div className='flex justify-between'>
                <h5 className='mb-4 font-semibold text-slate-800'>{name}</h5>
                <p className='text-sm text-grey flex items-center gap-x-2'>
                    <Instagram className='stroke-blue/80' size={20} />    
                    {/* {username} */}
                </p>
            </div>

            <p className='text-sm -mt-4 text-slate-800'>{spesialis}</p>
            <p className=' mt-3 italic text-sm w-[400px] text-slate-700'>{message}</p>

        </article>
    </div>
  )
}

export default TeamCard
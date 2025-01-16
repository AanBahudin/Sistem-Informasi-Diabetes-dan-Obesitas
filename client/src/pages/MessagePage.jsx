import React from 'react'
import customFetch from '../utils/customFetch'
import { Link, useLoaderData } from 'react-router-dom'
import moment from 'moment'
import { CalendarRange, Mail, Phone } from 'lucide-react'

export const loader = async() => {
    try {
        const { data } = await customFetch.get('/message')
        return data
    } catch (error) {
        return error
    }
}

const MessagePage = () => {

    const { messges, total } = useLoaderData()
    

    return (
        <section className='w-full h-full overflow-y-auto p-10 flex items-center justify-center bg-slate-50'>
            <section className='w-full h-full '>
                <h1 className='text-3xl text-slate-800 font-semibold'>Kotak Pesan Pengguna</h1>
                <p className='text-slate-600 w-[80%] mt-2'>Lihat dan kelola pesan yang dikirim oleh pengguna. Pastikan semua pertanyaan, masukan, dan saran mendapatkan tanggapan yang tepat waktu.</p>

                <section className="w-full flex items-center justify-start flex-wrap">
                { messges.length === 0 ? (
                <div className='w-full mt-10'>
                    <h1 className='text-slate-500 text-lg'>Tidak ada pesan dari pengguna</h1>
                </div>
            ) : (
                <div className='w-full mt-10 grid grid-cols-3 gap-y-4'>
                {messges.map((item, index) => {
                    return (
                        <Link to={`./${item._id}`} key={index} className='w-[400px] bg-transparent cursor-default hover:bg-[#00bbf9]/20 border-[2px] shadow-md hover:border-transparent border-slate-500/30 rounded-xl p-4 hover:shadow-lg duration-200 ease-in-out'>
                            <div className='w-full flex gap-x-4 items-center justify-start'>
                                <Mail className='h-5 w-5 stroke-[#00bbf9]' />
                                <h1 className='text-sm text-slate-500'>{ index === 0 ? 'Pesan terbaru' : 'Pesan pengguna' }</h1>
                            </div>

                            <h1 className='mt-4 text-sm font-medium'>{item.fullName}</h1>
                            <h1 className='mb-4 text-[12px] font-normal text-slate-600/80'>{item.email}</h1>
                            <p className='text-slate-600 text-sm'>{item.message.slice(0, 87)}....</p>

                            <div className='w-full flex justify-between items-center mt-6'>

                                <article className='flex justify-start items-center gap-x-3'>
                                    <CalendarRange className='stroke-slate-500 w-4 h-4' />
                                    <h1 className='text-[12px] text-slate-900'>{moment(item.createdAt).subtract(10, 'days').calendar()}</h1>
                                </article>

                                <article className='flex justify-start items-center gap-x-3'>
                                    <Phone className='stroke-slate-500 w-4 h-4' />
                                    <h1 className='text-[12px] text-slate-600'>{item.contact}</h1>
                                </article>
                            </div>
                        </Link>
                    )
                })}
            </div>
            )}
                </section>
            </section>  
        </section>
    )
}

export default MessagePage
        // <div className='w-[90%] mx-auto'>
        //     <section className="w-full flex justify-between items-center border-b-[1px] py-2 border-grey/50 mt-20">
        //         <p className='text-xl font-medium'>{total === 0 ? "" : total} <span className='text-md'>Pesan pengguna</span> </p>
        //     </section>
        //     { messges.length === 0 ? (
        //         <div className='w-full mt-10'>
        //             <h1 className='text-slate-500 text-lg'>Tidak ada pesan dari pengguna</h1>
        //         </div>
        //     ) : (
        //         <div className='w-full mt-10 grid grid-cols-3'>
        //         {messges.map((item, index) => {
                    

        //             return (
        //                 <Link to={`./${item._id}`} key={index} className='w-[400px] bg-transparent cursor-default hover:bg-[#00bbf9]/20 border-[2px] shadow-md hover:border-transparent border-slate-500/30 rounded-xl p-4 hover:shadow-lg duration-200 ease-in-out'>
        //                     <div className='w-full flex gap-x-4 items-center justify-start'>
        //                         <Mail className='h-5 w-5 stroke-[#00bbf9]' />
        //                         <h1 className='text-sm text-slate-500'>{ index === 0 ? 'Pesan terbaru' : 'Pesan pengguna' }</h1>
        //                     </div>

        //                     <h1 className='mt-4 text-sm font-medium'>{item.fullName}</h1>
        //                     <h1 className='mb-4 text-[12px] font-normal text-slate-600/80'>{item.email}</h1>
        //                     <p className='text-slate-600 text-sm'>{item.message.slice(0, 87)}....</p>

        //                     <div className='w-full flex justify-between items-center mt-6'>

        //                         <article className='flex justify-start items-center gap-x-3'>
        //                             <CalendarRange className='stroke-slate-500 w-4 h-4' />
        //                             <h1 className='text-[12px] text-slate-900'>{moment(item.createdAt).subtract(10, 'days').calendar()}</h1>
        //                         </article>

        //                         <article className='flex justify-start items-center gap-x-3'>
        //                             <Phone className='stroke-slate-500 w-4 h-4' />
        //                             <h1 className='text-[12px] text-slate-600'>{item.contact}</h1>
        //                         </article>
        //                     </div>
        //                 </Link>
        //             )
        //         })}
        //     </div>
        //     )}
            
        // </div>
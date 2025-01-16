import React from 'react'
import customFetch from '../utils/customFetch'
import { Link, useLoaderData } from 'react-router-dom'
import moment from 'moment'
import { CalendarRange, Mail, Phone } from 'lucide-react'
import MessageCard from '../components/MessageCard'

export const loader = async() => {
    try {
        const { data } = await customFetch.get('/message')
        return data
    } catch (error) {
        return error
    }
}

const MessagePage = () => {

    const { messges } = useLoaderData()
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
                        <MessageCard index={index} {...item} />
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
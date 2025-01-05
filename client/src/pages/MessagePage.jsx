import React from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'

export const loader = async() => {
    try {
        const { data } = await customFetch.get('/message')
        return data
    } catch (error) {
        return error
    }
}

const MessagePage = () => {

    const { messages, total } = useLoaderData()

    return (
        <div className='w-[90%] mx-auto'>
            <h1>Pesan Pengguna</h1>
        </div>
    )
}

export default MessagePage
import FormInputProfile from '../FormInputProfile'
import {hotlineData} from '../../utils/constants'
import HotlineCard from './HotlineCard'
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'
import { Form } from 'react-router-dom'
import TextAreaInput from '../TextAreaInput'

const Contact = () => {
  return (
    <div id='contacts' className='w-full mx-auto'>
        <h1 className='font-semibold text-slate-800 text-4xl text-center'>Hubungi Kami</h1>

        <section className='flex items-center p-10 rounded-xl bg-white mt-4 justify-around'>

          {/* form contact */}
          <Form method='POST' className='flex-1 max-w-[50%]'>
            <h3 className='text-xl font-semibold text-slate-800 '>Send us a message</h3>
            <p className='text-sm mt-2 text-slate-700'>Kami ingin mendengar dari Anda! Jika ada yang ingin ditanyakan atau dibicarakan, kirimkan pesan dan kami akan siap membantu dengan solusi terbaik.</p>

            {/* form */}
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 mt-6 mb-3'>
              <FormInputProfile  inputName='firstName'  label='Nama Depan' type='text' placeholder='John'  />
              <FormInputProfile  inputName='lastName'  label='Nama Belakang' type='text' placeholder='Doe'  />
              <FormInputProfile  inputName='email'  label='email' type='email' placeholder='johndoe@gmail.com'  />
              <FormInputProfile  inputName='contact'  label='Kontak' type='text' placeholder='08123348593'  />
            </div>
            
            <TextAreaInput name='message' labelText='Pesan' />
            {/* <label className='mt-4 text-sm font-semibold' htmlFor="message">Message</label>
            <textarea name="message" className='block ring-grey ring-1 w-full rounded-lg mt-2 resize-none h-40 px-4 py-[10px] text-sm' id="message" placeholder='Masukan pesan'></textarea> */}
            <button className='w-full bg-blue/80  text-sm py-3 rounded-md mt-4 cursor-default font-medium text-slate-700'>Kirim Pesan</button>
          </Form>


          {/* detail contact */}
          <article className="bg-blue/50 text-slate-700 w-[400px] p-6 rounded-xl flex flex-col gap-y-6">
            <h5 className='mb-4 font-semibold text-slate-800'>Hi! We are always here to help you</h5>

            {hotlineData.map((item, index) => {
              return <HotlineCard key={index} {...item} />
            })}

            <hr className='border-[1px] border-solid border-grey' />

            <p className='mt-2 text-grey'>Contact with us</p>
            <div className='w-full flex justify-around'>
              <Instagram className='hover:stroke-grey ease-in-out duration-200' />
              <Facebook className='hover:stroke-grey ease-in-out duration-200' />
              <Twitter className='hover:stroke-grey ease-in-out duration-200'/>
              <Linkedin className='hover:stroke-grey ease-in-out duration-200' />
              <Youtube className='hover:stroke-grey ease-in-out duration-200'/>
            </div>
          </article>
        </section>
    </div>
  )
}

export default Contact
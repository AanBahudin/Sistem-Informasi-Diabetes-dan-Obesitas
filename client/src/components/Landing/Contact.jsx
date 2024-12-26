import FormInput from '../FormInput'
import {hotlineData} from '../../utils/constants'
import HotlineCard from './HotlineCard'
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'

const Contact = () => {
  return (
    <div id='contacts' className='w-full mx-auto'>
        <h1 className='font-medium text-4xl text-center'>Contact us</h1>

        <section className='flex items-center p-10 rounded-xl bg-lightGrey mt-4 justify-around'>

          {/* form contact */}
          <article className='flex-1 max-w-[50%]'>
            <h3 className='text-xl font-semibold '>Send us a message</h3>
            <p className='text-sm mt-2'>Kami ingin mendengar dari Anda! Jika ada yang ingin ditanyakan atau dibicarakan, kirimkan pesan dan kami akan siap membantu dengan solusi terbaik.</p>

            {/* form */}
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 mt-6'>
             <FormInput name="firstName" labelText="First name" placeholder="John" />
             <FormInput name="lastName" labelText="Last name" placeholder="Doe" />
             <FormInput name="email" labelText="Email" placeholder="johnDoe@gmail.com" />
             <FormInput name="contactDetails" labelText="Contact Details" placeholder="+62 82345" />
            </div>

            <label className='mt-4 text-sm font-semibold' htmlFor="message">Message</label>
            <textarea name="message" className='block ring-grey ring-1 w-full rounded-lg mt-2 resize-none h-40 px-4 py-[10px] text-sm' id="message" placeholder='Masukan pesan'></textarea>
          </article>


          {/* detail contact */}
          <article className="bg-[url('/src/assets/images/hero.png')] bg-cover bg-no-repeat text-lightGrey w-[400px] p-6 rounded-xl flex flex-col gap-y-6">
            <h5 className='mb-4 font-semibold text-grey'>Hi! We are always here to help you</h5>

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
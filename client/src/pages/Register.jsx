import { registerPhoto } from '../assets/images'
import { FormInput, FormSelect } from '../components'
import { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return formData;
}

const Register = () => {

  const [showPass, setShowPass] = useState(false);

  return (
    <div className='w-fullScreen h-fullScreen overflow-hidden grid grid-cols-2'>
      <Form method='POST' className="w-full h-full flex items-center justify-items-start col-span-1 bg-[url('/src/assets/images/gradient.jpg')] bg-no-repeat bg-cover">
            <div className="w-[80%] mx-auto ">
              <h1 className='font-semibold text-2xl'>Bergabung bersama kami</h1>
              <p className='text-sm mt-2 mb-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                <FormInput 
                  labelText="Nama lengkap"
                  inputType="text"
                  name="name"
                  placeholder="John Doe"
                  isFirstItem={true} />

                <div className='w-full flex gap-x-6 flex-row-reverse'>
                  <FormSelect 
                    labelText="Jenis kelamin"
                    name='jenisKelamin'
                    placeholder="masukan jenis kelamin"
                    list={['Pria', 'Wanita']}
                    isFirstItem={false}
                  />

                  <FormInput  
                    labelText="Email"
                    inputType="email"
                    name="email"
                    placeholder="enter your email"
                    isFirstItem={false} />
                </div>

                <FormInput  
                  labelText="Password"
                  inputType={showPass ? 'text' : 'password'}
                  name='password'
                  placeholder="enter your password"
                  isFirstItem={false} />
              
                <div className='w-full flex justify-between'>
                  <section className='flex justify-center flex-row gap-x-4'>
                    <input name='showpass' className='w-4 h-4' type="checkbox" onChange={() => setShowPass(!showPass)}/>
                    <label htmlFor="showpass" className='text-[12px]'>show password</label>
                  </section>

                  <p className='text-right text-[12px] cursor-default underline text-grey lowercase mb-10'>lupa password ?</p>

                </div>

              <button type='submit' className='w-full text-md text-grey font-semibold tracking-wider cursor-default hover:bg-blue duration-200 ease-in-out bg-blue/80 py-3 rounded-md'>Daftar</button>
              <p className='text-grey text-center text-[12px] mt-4'>Sudah punya akun? <Link to='/login' className='underline'>Daftar disini</Link></p>

            </div>
        </Form>


      <section className="col-span-1 bg-green-100">
        <img src={registerPhoto} alt="" />
      </section>
    </div>
  )
}

export default Register
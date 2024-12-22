import { aboutPhoto } from '../assets/images';
import { FormInput } from '../components'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

  const [showPass, setShowPass] = useState(false);

  return (
    <div className='w-fullScreen h-fullScreen grid grid-cols-12'>

        <section className="w-full h-full flex justify-center items-center col-span-6 bg-[url('/src/assets/images/gradient.jpg')] bg-no-repeat bg-cover">
            <div className="px-6 py-10 w-[70%]">
              <h1 className='font-semibold text-2xl'>Selamat datang kembali</h1>
              <p className='text-sm mt-2 mb-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                <FormInput  
                  labelText="Email"
                  inputType="email"
                  name="email"
                  placeholder="enter your email"
                  isFirstItem={true} />

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

                  <p className='text-right text-[12px] cursor-default text-grey lowercase mb-10 underline'>lupa password?</p>

                </div>

              <button className='w-full text-md text-grey font-semibold tracking-wider cursor-default hover:bg-blue duration-200 ease-in-out bg-blue/80 py-3 rounded-md'>Login</button>
              <p className='text-grey text-center text-[12px] mt-4'>Belum punya akun? <Link to='/register' className='underline'>Daftar disini</Link></p>

            </div>
        </section>

        <section className='w-full h-full bg-green-100 col-span-6 overflow-hidden'>
            <img className='h-fit' src={aboutPhoto} alt="" />
        </section>
    </div>
  )
}

export default Login
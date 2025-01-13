import { aboutPhoto } from '../assets/images';
import { LoaderCircle } from 'lucide-react';
import { FormInput } from '../components'
import { Link, redirect, Form, useNavigation } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';


export const loader = async() => {
  try {
    const {data} = await customFetch.get('/users/current-user')
    
    if ( data.user.role ) {
      if (data.user.role === 'admin') {
        return redirect('/admin/dashboard')
      } else {
        return redirect('/dashboard')
      }
    }
  } catch (error) {
    return null
  }
}

export const action = async({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Successfully logged in');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }
}

const Login = () => {

  const [showPass, setShowPass] = useState(false);
  const isSubmitting = useNavigation().state === 'submitting'

  return (
    <div className='w-fullScreen h-fullScreen grid grid-cols-12'>

        <Form method="POST" className="w-full h-full flex justify-center items-center col-span-6 bg-[url('/src/assets/images/gradient.jpg')] bg-no-repeat bg-cover">
            <div className="px-6 py-10 w-[70%]">
              <h1 className='font-semibold text-2xl'>Selamat datang kembali</h1>
              <p className='text-sm mt-2 mb-10'>Akses akun Anda untuk melanjutkan</p>

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

              <button disabled={isSubmitting} className='w-full flex items-center justify-center gap-x-6 text-md text-grey font-semibold tracking-wider cursor-default hover:bg-blue duration-200 ease-in-out bg-blue/80 disabled:bg-blue py-3 rounded-md'>
                { isSubmitting ?  <LoaderCircle className='stroke-white animate-spin ' /> : 'Login'}
              </button>
              <p className='text-grey text-center text-[12px] mt-4'>Belum punya akun? <Link to='/register' className='underline'>Daftar disini</Link></p>

            </div>
        </Form>

        <section className='w-full h-full bg-green-100 col-span-6 overflow-hidden'>
            <img className='h-fit' src={aboutPhoto} alt="" />
        </section>
    </div>
  )
}

export default Login
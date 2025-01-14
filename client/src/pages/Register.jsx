import { loginPhoto } from '../assets/images'
import { useState } from 'react'
import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { LoaderCircle, AtSign, X, KeyRound, EyeClosed, Cross, Eye, User } from 'lucide-react';


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

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successfull !')
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }
}

const Register = () => {

  const [showPass, setShowPass] = useState(false);
  const [isEmail, setEmail] = useState('');
  const [isName, setName] = useState('');
  const isSubmitting = useNavigation().state === 'submitting'

  return (
    <Form method='POST' className='w-fullScreen h-fullScreen p-20 flex items-center justify-center'>

      <section className='w-full h-full mt-4 rounded-xl grid grid-cols-2'>

        {/* KOLOM KIRI */}
        <article className='col-span-1 flex items-start justify-center flex-col p-6'>
          <Cross className='stroke-white bg-blue/80 w-12 h-12 p-2 shadow-md mb-4 rounded-md' />
          <h1 className='text-slate-700 font-semibold text-3xl'>Buat Akun Baru</h1>
          <p className='text-slate-600 mt-1 w-[80%]'>Daftar sekarang untuk mulai menjelajahi semua fitur yang kami tawarkan.</p>


          {/* input field */}
          <div className='w-[80%] mt-4'>
            <label htmlFor="nama" className='text-slate-800 mb-10 font-semibold'>Nama lengkap</label>
            <div className='w-full flex items-center justify-between h-12 rounded-xl border-[2px] border-slate-400 focus-within:border-blue/80'>
              <User className='stroke-slate-600 w-5 h-5 ml-2' />
              <input type="text" name="nama" id="nama" className='w-full px-6 h-full text-md outline-none focus:placeholder:text-transparent text-slate-800' autoFocus autoComplete='off' placeholder='john doe'  required autoCorrect='off' onChange={(e) => setName(e.target.value)} value={isName}/>
              <X onClick={() => setName('')} className={` ${isName ? 'visible' : 'invisible'} stroke-red-400 w-5 h-5 mr-2`} />
            </div>
          </div>

          <div className='w-[80%] mt-2'>
            <label htmlFor="email" className='text-slate-800 mb-10 font-semibold'>Email</label>
            <div className='w-full flex items-center justify-between h-12 rounded-xl border-[2px] border-slate-400 focus-within:border-blue/80'>
              <AtSign className='stroke-slate-600 w-5 h-5 ml-2' />
              <input type="text" name="email" id="email" className='w-full px-6 h-full text-md outline-none focus:placeholder:text-transparent text-slate-800' autoComplete='off' placeholder='johndoe@gmail.com'  required autoCorrect='off' onChange={(e) => setEmail(e.target.value)} value={isEmail}/>
              <X onClick={() => setEmail('')} className={` ${isEmail ? 'visible' : 'invisible'} stroke-red-400 w-5 h-5 mr-2`} />
            </div>
          </div>

          <div className='w-[80%] mt-2'>
            <label htmlFor="password" className='text-slate-800 mb-10 font-semibold'>Password</label>
            <div className='w-full flex items-center justify-between h-12 rounded-xl border-[2px] border-slate-400 focus-within:border-blue/80'>
              <KeyRound className='stroke-slate-600 w-5 h-5 ml-2' />
              <input type={showPass ? 'text' : 'password'} name="password" id="password" className='w-full px-6 h-full text-md outline-none text-slate-800 focus:placeholder:text-transparent' autoComplete='off' placeholder='password'  required autoCorrect='off' />

              {showPass ? (
                <EyeClosed onClick={() => setShowPass(false)} className='stroke-blue/80 w-5 h-5 mr-2' />
              ) : (
                <Eye onClick={() => setShowPass(true)} className='stroke-blue/80 w-5 h-5 mr-2' />
              )}
            </div>
          </div>

          <button type='submit' disabled={isSubmitting} className='w-[80%] cursor-default hover:bg-blue/90 duration-200 ease-in-out py-2 bg-blue/80 text-center rounded-xl font-semibold text-white mt-4 flex items-center justify-center gap-x-4'>
            {
              isSubmitting ? (  
                <>
                  <LoaderCircle className='w-6 h-6 stroke-white animate-spin' />
                  tunggu sebentar
                </>

              ) : 'daftar'
            }
          
          </button>

          <div className='w-[80%] flex items-start justify-start gap-x-2 mt-4'>
            <input type="checkbox" className='outline-none'required />
            <label htmlFor="aggrement" className='text-[12px] text-slate-700/80'>Dengan menyetujui proses daftar ini, Anda menerima dan setuju untuk mematuhi <span className='text-blue/80'> Ketentuan Layanan, Kebijakan Privasi, </span> serta semua aturan dan regulasi yang berlaku</label>
          </div>


          <p className='text-center w-[70%] text-sm text-slate-800 mt-4'>Sudah punya akun ? <Link to='/login' className='cursor-default font-medium text-blue/80 underline'> masuk disini </Link></p>
        </article>

        {/* KOLOM KANAN */}
        <article className='w-full h-full overflow-hidden rounded-xl bg-blue/80 flex items-center justify-center'>
          <img className='h-full' src={loginPhoto} />
        </article>
      </section>

    </Form>
  )
}

export default Register
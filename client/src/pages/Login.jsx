import { loginPhoto } from '../assets/images';
import { LoaderCircle, AtSign, X, KeyRound, EyeClosed, Cross, Eye } from 'lucide-react';
import { Link, redirect, Form, useNavigation } from 'react-router-dom';
import { useState } from 'react';
import { handleToast } from '../utils/constants';
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
    handleToast('success', 'Login Berhasil', 'Selamat datang dihalaman dashboard anda', 3000)
    return redirect('/dashboard');
  } catch (error) {
    handleToast('error', 'Terjadi Kesalahan', error?.response?.data?.msg, 3000)
    return error
  }
}

const Login = () => {

  const [showPass, setShowPass] = useState(false);
  const [isEmail, setEmail] = useState('')
  const isSubmitting = useNavigation().state === 'submitting'

  return (
    <Form method='POST' className='w-fullScreen h-fullScreen p-20 flex items-center justify-center'>

      <section className='w-full h-full mt-4 rounded-xl grid grid-cols-2'>

        {/* KOLOM KIRI */}
        <article className='col-span-1 flex items-start justify-center flex-col p-6'>
          <Cross className='stroke-white bg-blue/80 w-12 h-12 p-2 shadow-md mb-4 rounded-md' />
          <h1 className='text-slate-700 font-semibold text-3xl'>Selamat datang kembali</h1>
          <p className='text-slate-600 mt-1'>Login untuk melanjutkan dan nikmati kemudahan akses ke semua fitur kami.</p>


          {/* input field */}
          <div className='w-[80%] mt-4'>
            <label htmlFor="email" className='text-slate-800 mb-10 font-semibold'>Email</label>
            <div className='w-full flex items-center justify-between h-12 rounded-xl border-[2px] border-slate-400 focus-within:border-blue/80'>
              <AtSign className='stroke-slate-600 w-5 h-5 ml-2' />
              <input type="text" name="email" id="email" className='w-full px-6 h-full text-md outline-none focus:placeholder:text-transparent text-slate-800' autoFocus autoComplete='off' placeholder='johndoe@gmail.com'  required autoCorrect='off' onChange={(e) => setEmail(e.target.value)} value={isEmail}/>
              <X onClick={() => setEmail('')} className={` ${isEmail ? 'visible' : 'invisible'} stroke-red-400 w-5 h-5 mr-2`} />
            </div>
          </div>

          <div className='w-[80%] mt-4'>
            <label htmlFor="password" className='text-slate-800 mb-10 font-semibold'>Password</label>
            <div className='w-full flex items-center justify-between h-12 rounded-xl border-[2px] border-slate-400 focus-within:border-blue/80'>
              <KeyRound className='stroke-slate-600 w-5 h-5 ml-2' />
              <input type={showPass ? 'text' : 'password'} name="password" id="password" className='w-full px-6 h-full text-md outline-none focus:placeholder:text-transparent text-slate-800' autoComplete='off' placeholder='password'  required autoCorrect='off' />

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

              ) : 'masuk'
            }
          
          </button>

          <div className='w-[80%] flex items-start justify-start gap-x-2 mt-4'>
            <input type="checkbox" className='outline-none' name="aggrement" id="aggrement" required />
            <label htmlFor="aggrement" className='text-[12px] text-slate-700/80'>Dengan menyetujui proses login ini, Anda menerima dan setuju untuk mematuhi <span className='text-blue/80'> Ketentuan Layanan, Kebijakan Privasi, </span> serta semua aturan dan regulasi yang berlaku</label>
          </div>


          <p className='text-center w-[70%] text-sm text-slate-800 mt-4'>Belum punya akun ? <Link to='/register' className='cursor-default font-medium text-blue/80 underline'> daftar disini </Link></p>
        </article>

        {/* KOLOM KANAN */}
        <article className='w-full h-full overflow-hidden rounded-xl bg-blue/60 flex items-center justify-center'>
          <img className='h-full' src={loginPhoto} />
        </article>
      </section>

    </Form>
  )
}

export default Login
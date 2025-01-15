import { Edit, X, LoaderCircle, Loader, LoaderCircleIcon, Camera, Pencil, UserRound, Newspaper, Hospital } from 'lucide-react'
import moment from 'moment'
import { userPhoto } from '../assets/images'
import { FormInputProfile, FormSelect } from '../components'
import { NavLink, redirect, useLoaderData, useLocation, Form, useNavigation, replace } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { useDashboardContext } from './DashboardLayout'
import { useState } from 'react'

export const action = async({ request }) => {
  const formData = await request.formData();
  
  const file = formData.get('photo');
  if (file && file.size > 500000) {
    toast.error('Ukuran gambar terlalu berat')
    return null
  }

  try {
    await customFetch.patch('/users/edit', formData)
    toast.success('Berhasil di update !')
    return redirect('/dashboard/profile')
  } catch (error) {
    const errorArr = error?.response?.data?.msg
    console.log(error);
    
    toast.error(errorArr.join(", "));
    return error
  }
}

export const loader = async() => {

  try {
    const { data } = await customFetch.get('/users/current-user')
    return data.user;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard')
  }

}

const ProfilePage = () => {

  const queryParams = new URLSearchParams(useLocation().search).get('edit');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  const isEditData = queryParams === 'true';  

  const data = useLoaderData()

  const {beratBadan, tinggiBadan, IBM, IBMStatus, kondisiTubuh, kadarGula, statusKadarGula, targetKesehatan, jenisDiet } = data.data_kesehatan;
  
  const { deleteProfileFunc } = useDashboardContext()
  const dateOnly = moment(data.createdAt).subtract(10, 'days').calendar();
  const terakhirUpdate = moment(data.updatedAt).calendar();

  const formatDate = (date) => {
    return date.split('T')[0];
  }
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('first')

  const imageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  return (
    <section className='w-full h-[100vh] flex justify-center bg-slate-50'>
      <section className='w-full max-h-full p-10 '>
        <h1 className='text-3xl text-slate-800 font-semibold'>Kelola Profil dan Informasi Anda</h1>
        <p className='text-slate-600 w-[80%] mt-2'>Anda dapat memperbarui data pribadi, mengelola pengaturan akun, dan memantau informasi yang terkait dengan profil Anda.</p>

        {/* PEMBUNGKUS ARTIKEL INI TIDAK DAPAT MEMENUHI TINGGI DARI PARENTNYA */}
        <article className='w-full h-[80%] grid grid-cols-12 gap-x-10 mt-10'>

          {/* FOTO DAN MENU SECTION */}
          <div className='col-span-4 bg-slate-100 rounded-3xl py-8 px-4'>
            
            {/* CONTAINER FOTO PROFIL */}
            <article className='w-full  flex flex-col justify-center items-center'>
              <div className='w-28 h-28 bg-slate-500 rounded-full'></div>
              <h1 className='text-slate-900 font-semibold text-lg mt-2'>{data.nama}</h1>
              <p className='capitalize text-slate-800 text-sm'>{data.role === 'user' ? 'Pengguna' : 'Administrator'}</p>
            </article>

            {/* NAVIGASI MENU */}
            <article className='w-full flex flex-col mt-10 gap-y-4'>

              <div onClick={() => setActiveTab('first')} className={`w-full rounded-xl ${ activeTab === 'first' ? 'bg-blue/30' : 'bg-slate-100' } py-2 flex justify-start px-4 duration-200 ease-in-out`}>
                <p className={`flex items-center justify-start gap-x-3 clear-start text-sm ${activeTab === 'first' ? 'text-slate-900' : 'text-slate-700'}`}>
                  <UserRound className={`stroke-slate-700 w-5 h-5`} />
                  Informasi Pribadi
                </p>
              </div>

              <div onClick={() => setActiveTab('second')} className={`w-full rounded-xl ${ activeTab === 'second' ? 'bg-blue/30' : 'bg-slate-100' } py-2 flex justify-start px-4 duration-200 ease-in-out`}>
                <p className={`flex items-center justify-start gap-x-3 clear-start text-sm ${activeTab === 'second' ? 'text-slate-900' : 'text-slate-700'}`}>
                  <Hospital className={`stroke-slate-700 w-5 h-5`} />
                  Informasi Kesehatan
                </p>
              </div>

              <div onClick={() => setActiveTab('third')} className={`w-full rounded-xl ${ activeTab === 'third' ? 'bg-blue/30' : 'bg-slate-100' } py-2 flex justify-start px-4 duration-200 ease-in-out`}>
                <p className={`flex items-center justify-start gap-x-3 clear-start text-sm ${activeTab === 'third' ? 'text-slate-900' : 'text-slate-700'}`}>
                  <Newspaper className={`stroke-slate-700 w-5 h-5`} />
                  Informasi Umum
                </p>
              </div>
            </article>


          </div>

          <div className='col-span-8 bg-slate-100 rounded-3xl h-full p-6'>
            <h1 className='font-semibold text-xl text-slate-800'>{ activeTab === 'first' ? 'Informasi Pribadi' : ( activeTab === 'second' ? 'Informasi Kesehatan' : 'Informasi Umum' ) }</h1>

            <article className='w-full mt-6'>

              {
                activeTab === 'first' ? (
                  <section className='w-full flex flex-col gap-y-4'>
                      <div className='w-full grid grid-cols-2 gap-x-6'>
                        <FormInputProfile type='text' inputName='nama' label='nama lengkap' isRequired={true} defaultValue={data.nama} />
                        <FormInputProfile type='email' inputName='email' label='email' isRequired={true} defaultValue={data.email} />
                      </div>

                      <FormInputProfile type='text' label='Nomor telepon' isRequired={true} defaultValue={data.email} />
                      
                      <div className='w-full grid grid-cols-2 gap-x-6'>
                        <FormSelect inputName='jenisKelamin' defaultValue={data.jenisKelamin} label='jenis kelamin' list={['Pria', 'Wanita']} />
                        <FormInputProfile type='date' inputName='tanggalLahir' label='tanggal lahir' isRequired={true} defaultValue={data.tanggalLahir} />
                      </div>
                  </section>
                ) : (
                  activeTab === 'second' ? (
                    <section className='w-full flex flex-col gap-y-4'>
                      <div className='w-full grid grid-cols-2 gap-x-6'>
                        <FormInputProfile type='text' inputName='nama' label='nama lengkap' isRequired={true} defaultValue={data.nama} />
                        <FormInputProfile type='email' inputName='email' label='email' isRequired={true} defaultValue={data.email} />
                      </div>

                      <FormInputProfile type='text' label='Nomor telepon' isRequired={true} defaultValue={data.email} />
                      
                      <div className='w-full grid grid-cols-2 gap-x-6'>
                        <FormSelect inputName='jenisKelamin' defaultValue={data.jenisKelamin} label='jenis kelamin' list={['Pria', 'Wanita']} />
                        <FormInputProfile type='date' inputName='tanggalLahir' label='tanggal lahir' isRequired={true} defaultValue={data.tanggalLahir} />
                      </div>
                  </section>
                  ) : (
                    null
                  )
                )
              }
              
              {/* PERSONAL MAIN CONTAINER  */}

            </article>
          </div>
            
        </article>

      </section>  
    </section>
  )
}

export default ProfilePage
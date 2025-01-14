import { Edit, X, LoaderCircle, Loader, LoaderCircleIcon, Camera, Pencil } from 'lucide-react'
import moment from 'moment'
import { userPhoto } from '../assets/images'
import { DataContainer } from '../components'
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

  const imageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  return (
    <section className='w-full h-full overflow-y-auto p-10 flex items-center justify-center bg-slate-50'>
      <section className='w-full h-full '>
        <h1 className='text-3xl text-slate-800 font-semibold'>Kelola Profil dan Informasi Anda</h1>
        <p className='text-slate-600 w-[80%] mt-2'>Anda dapat memperbarui data pribadi, mengelola pengaturan akun, dan memantau informasi yang terkait dengan profil Anda.</p>

        <div className='w-full bg-blue/80 h-[25vh] mt-10 rounded-t-xl flex items-end justify-end p-4 group'>
          <button className='flex items-center gap-x-4 mr-2 bg-white px-6 py-2 rounded-lg text-sm transition-opacity opacity-0 group-hover:opacity-100 duration-200 ease-in-out'>
            <Pencil className='w-4 h-4 stroke-slate-600' />
            Edit profil
          </button>
        </div>

        {/*  PHOTO PROFILE */}
        <div className='w-full flex px-8 gap-x-6'>
          {selectedImage ? (
            <img className='w-36 h-36 rounded-full bg-slate-500 border-[2px] border-white -mt-16' src={selectedImage} alt="avatar" />
          ) : (
            <img className='w-36 h-36 rounded-full bg-slate-100 border-[2px] border-white -mt-16' src={data.photo || userPhoto} alt="avatar" />
          )}
          <input type="file" name="photo" id="photo" className='hidden'  accept='image/*' onChange={imageUpload} />          
          <label htmlFor='photo' className='flex items-center gap-x-4 px-6 py-2 h-fit rounded-lg bg-blue/80 mt-2 text-sm text-slate-800 cursor-default' onChange={imageUpload}>
            <Camera className='w-5 h-5' />
            Pilih foto
          </label>
        </div>

        {/* MAIN INFORMATION */}
        <div className='w-full px-10 mt-2'>
          <h1 className='text-lg font-semibold text-slate-800 capitalize'>{ data.nama }</h1>
          <p className='text-sm text-slate-600'>{ data.email } | {data.nomorTelepon}</p>
          <p className='text-sm text-slate-600 mt-2'>{formatDate(data.createdAt)}</p>
        </div>

        {/* ALL INFORMATION */}
        <div className='w-full my-10 grid grid-cols-12 gap-x-4'>
          
          <section className='col-span-8 grid grid-cols-3 gap-4'>
            {/* data container */}
            <DataContainer label='Nama lengkap' value={data.nama} />
            <DataContainer label='Email' value={data.nama} />
            <DataContainer label='Nomor telepon' value={data.nama} />
            <DataContainer label='Jenis kelamin' value={data.nama} />
            <DataContainer label='Tanggal lahir' value={data.nama} />
          </section>

          <section className='col-span-4'>
            <h1>Kondisi kesehatan</h1>
          </section>

        </div>

      </section>  
    </section>
  )
}

export default ProfilePage
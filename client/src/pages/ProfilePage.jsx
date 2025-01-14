import { Edit, X, LoaderCircle, Loader, LoaderCircleIcon } from 'lucide-react'
import moment from 'moment'
import { userPhoto } from '../assets/images'
import { ProfileInput } from '../components'
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
  const formattedDate = data.tanggalLahir.split('T')[0];
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

       
      </section>  
    </section>
  )
}

export default ProfilePage
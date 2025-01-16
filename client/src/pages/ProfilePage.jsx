import { Edit, X, LoaderCircle, Loader, LoaderCircleIcon, Camera, Pencil, UserRound, Newspaper, Hospital, Upload, Trash } from 'lucide-react'
import { loginPhoto } from '../assets/images'
import moment from 'moment'
import { userPhoto } from '../assets/images'
import { DataContainer, FormInputProfile, FormSelect } from '../components'
import { NavLink, redirect, useLoaderData, useLocation, Form, useNavigation, replace } from 'react-router-dom'
import { toast } from 'react-toastify'
import { handleToast } from '../utils/constants'
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
    return handleToast('success', 'Profil Diperbaharui', "Profil anda berhasil diperbaharui", 3000)
  } catch (error) {
    const errorArr = error?.response?.data?.msg
    // console.log(error);
    return handleToast('error', 'Terjadi Kesalahan', errorArr, 3000)
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
  console.log(data);
  

  const {beratBadan, tinggiBadan, IBM, IBMStatus, kondisiTubuh, kadarGula, statusKadarGula, targetKesehatan, jenisDiet } = data.data_kesehatan;
  const { nama, email } = data
  

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
    <Form method='POST' encType='multipart/form-data' className='w-full h-[100vh] flex justify-center bg-slate-50'>
      <section className='w-full max-h-full p-10 '>
        <h1 className='text-3xl text-slate-800 font-semibold'>Kelola Profil dan Informasi Anda</h1>
        <p className='text-slate-600 w-[80%] mt-2'>Anda dapat memperbarui data pribadi, mengelola pengaturan akun, dan memantau informasi yang terkait dengan profil Anda.</p>

        {/* PEMBUNGKUS ARTIKEL INI TIDAK DAPAT MEMENUHI TINGGI DARI PARENTNYA */}
        <article className='w-full h-[80%] grid grid-cols-12 gap-x-10 mt-10'>

          {/* FOTO DAN MENU SECTION */}
          <div className='col-span-4 bg-slate-100 rounded-3xl py-8 px-4'>
            
            {/* CONTAINER FOTO PROFIL */}
            <article className='w-full  flex flex-col justify-center items-center'>
            
              <section className='w-28 h-28 relative bg-slate-200 rounded-full overflow-hidden border-[2px] border-white'>
                <img className='w-full h-full object-cover' src={selectedImage ? selectedImage : (data.photo || loginPhoto)} alt="" />
              </section>
              <h1 className='text-slate-900 font-semibold text-lg mt-2'>{data.nama}</h1>
              <p className='capitalize text-slate-800 text-sm'>{data.role === 'user' ? 'Pengguna' : 'Administrator'}</p>

              <div className='w-full flex justify-center items-center mt-4 gap-x-4'>
                <input className='text-[12px] font-medium mb-4 text-gray-500 hidden' type="file" name="photo" id="photo" accept='image/*' onChange={imageUpload} />
                <label htmlFor="photo" className='bg-blue/70 px-4 py-2 rounded-lg text-xs'>
                  {data.photo ? 'Ganti foto' : 'tambah foto'}
                </label>

                <button onClick={deleteProfileFunc} className={`${data.photo ? 'visible' : 'hidden'} bg-red-400/70 px-4 py-2 rounded-lg text-xs`}>Hapus foto</button>
              </div>
            </article>

            {/* NAVIGASI MENU */}
            <article className='w-full flex flex-col mt-12 gap-y-4'>

              <div onClick={() => setActiveTab('first')} className={`w-full rounded-xl ${ activeTab === 'first' ? 'bg-blue/30' : 'bg-slate-100' } py-2 flex justify-start px-4 duration-200 ease-in-out`}>
                <p className={`cursor-default flex items-center justify-start gap-x-3 clear-start text-sm ${activeTab === 'first' ? 'text-slate-900' : 'text-slate-700'}`}>
                  <UserRound className={`stroke-slate-700 w-5 h-5`} />
                  Informasi Pribadi
                </p>
              </div>

              <div onClick={() => setActiveTab('second')} className={`w-full rounded-xl ${ activeTab === 'second' ? 'bg-blue/30' : 'bg-slate-100' } py-2 flex justify-start px-4 duration-200 ease-in-out`}>
                <p className={`cursor-default flex items-center justify-start gap-x-3 clear-start text-sm ${activeTab === 'second' ? 'text-slate-900' : 'text-slate-700'}`}>
                  <Hospital className={`stroke-slate-700 w-5 h-5`} />
                  Informasi Kesehatan
                </p>
              </div>

              <div onClick={() => setActiveTab('third')} className={`w-full rounded-xl ${ activeTab === 'third' ? 'bg-blue/30' : 'bg-slate-100' } py-2 flex justify-start px-4 duration-200 ease-in-out`}>
                <p className={`cursor-default flex items-center justify-start gap-x-3 clear-start text-sm ${activeTab === 'third' ? 'text-slate-900' : 'text-slate-700'}`}>
                  <Newspaper className={`stroke-slate-700 w-5 h-5`} />
                  Informasi Umum
                </p>
              </div>
            </article>


          </div>

          <div className='col-span-8 bg-slate-100 rounded-3xl h-full p-6 flex flex-col justify-between'>

            <article>
              <h1 className='font-semibold text-xl text-slate-800'>{ activeTab === 'first' ? 'Informasi Pribadi' : ( activeTab === 'second' ? 'Informasi Kesehatan' : 'Informasi Umum' ) }</h1>

              <article className='w-full mt-6 flex flex-col justify-between'>

                <section className={`w-full ${activeTab === 'first' ? 'flex flex-col' : 'hidden'} gap-y-4`}>
                    <div className='w-full grid grid-cols-2 gap-x-6'>
                      <FormInputProfile type='text' inputName='nama' label='nama lengkap' isRequired={true} defaultValue={nama} />
                      <FormInputProfile type='email' inputName='email' label='email' isRequired={true} defaultValue={email} />
                    </div>

                    <FormInputProfile type='text' inputName='nomorTelepon' label='Nomor telepon' isRequired={true} defaultValue={data.email} />
                    
                    <div className='w-full grid grid-cols-2 gap-x-6'>
                      <FormSelect inputName='jenisKelamin' defaultValue={data.jenisKelamin} label='jenis kelamin' list={['Pria', 'Wanita']} />
                      <FormInputProfile type='date' inputName='tanggalLahir' label='tanggal lahir' isRequired={true} defaultValue={formatDate(data.tanggalLahir)} />
                    </div>
                </section>

                <section className={`w-full ${activeTab === 'second' ? 'flex flex-col' : 'hidden'} gap-y-4`}>
                  <div className='w-full grid grid-cols-2 gap-x-6 gap-y-4'>
                    <FormInputProfile type='number' inputName='beratBadan' label='berat badan' defaultValue={Number(beratBadan)} />
                    <FormInputProfile type='number' inputName='tinggiBadan' label='tinggi badan' defaultValue={Number(tinggiBadan)} />
                    <FormSelect inputName='kondisiTubuh' defaultValue={kondisiTubuh} label='Kondisi tubuh' list={['Sehat', 'Cukup Sehat', 'Kurang Sehat', 'Tidak Sehat']} />
                    <FormSelect inputName='targetKesehatan' defaultValue={targetKesehatan} label='Capaian Kesehatan' list={['Menurunkan Berat Badan', 'Mempertahankan Berat Badan', 'Menaikkan Berat Badan']} />
                    <FormSelect inputName='jenisDiet' defaultValue={jenisDiet} label='Jenis diet' list={['Diet Rendah Karbohidrat', 'Diet Rendah Gula', 'Diet Vegatarian', 'Diet Rendah Lemak', 'Diet Tinggi Protein']} />
                    <FormInputProfile type='number' inputName='kadarGula' label='kadar gula' defaultValue={kadarGula.toString()} />
                  </div>
                </section>

                <section className={`w-full ${activeTab === 'third' ? 'flex flex-col' : 'hidden'} gap-y-4`}>
                  <div className='w-full grid grid-cols-2 gap-x-6 gap-y-4'>
                    <DataContainer label='BMI' value={IBM} />
                    <DataContainer label='Status BMI' value={IBMStatus} />
                    <DataContainer label='status kadar gula' value={statusKadarGula} />
                  </div>

                  <div className='w-full grid grid-cols-2 gap-x-6 gap-y-4'>
                    <DataContainer label='jumlah artikel disukai' value={data.bookmark.length + ' Artikel'} />
                    <DataContainer label='jumlah artikel disimpan' value={data.favorite.length + ' Artikel'}  />
                    <DataContainer label='Bergabung sejak' value={formatDate(data.createdAt)}  />
                    <DataContainer label='Terakhir update' value={formatDate(data.updatedAt)}  />
                  </div>
                </section>
            </article>
            </article>
              <button disabled={isSubmitting} type='submit' className='flex gap-x-2 justify-center items-center w-48  text-stroke-800 self-end bg-blue/50 hover:bg-blue/70 duration-200 ease-in-out cursor-default px-4 py-2 text-sm rounded-lg'>
                {isSubmitting && <LoaderCircle className='w-4 h-4 animate-spin stroke-slate-800' />}
                {isSubmitting ? 'Menyimpan ...' : 'Simpan Perubahan'}
              </button>
          </div>
            
        </article>

      </section>  
    </Form>
  )
}

export default ProfilePage
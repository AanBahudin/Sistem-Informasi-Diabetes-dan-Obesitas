import { Edit, X } from 'lucide-react'
import moment from 'moment'
import { firstDoctor } from '../assets/images'
import { ProfileInput } from '../components'
import { NavLink, redirect, useLoaderData, useLocation, Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action = async({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch('/users/edit', data)
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
  const isEditData = queryParams === 'true';  

  const data = useLoaderData()
  
  const {beratBadan, tinggiBadan, IBM, IBMStatus, kondisiTubuh, kadarGula, statusKadarGula, targetKesehatan, jenisDiet } = data.data_kesehatan;
  
  const dateOnly = moment(data.createdAt).subtract(10, 'days').calendar();
  const terakhirUpdate = moment(data.updatedAt).calendar();
  const formattedDate = data.tanggalLahir.split('T')[0];

  const deleteProfileFunc = async() => {
    await customFetch.patch('/users/delete-profile')
    toast.success('Foto dihapus!')
    return redirect('.')
  }

  return (
    <div className='p-10 h-full overflow-y-auto grid grid-cols-12 gap-x-6 text-grey'>

      <section className='bg-white h-fit col-span-8 rounded-xl px-10 py-8 '>
        
        <div className='w-full flex justify-end items-end'>
          {isEditData ? (
            <NavLink to='/dashboard/profile' className='flex items-center justify-center gap-x-2 text-medium'>
              <X size={15} className='stroke-red-500'/>
              cancel
            </NavLink>
          ) : (
            <NavLink to='/dashboard/profile?edit=true' className='flex items-center justify-center gap-x-2 text-medium'>
              <Edit className='stroke-blue' size={15} />
              edit
            </NavLink>
          )}
          
        </div>

       
        {/* avatar container */}
        <div className='flex gap-x-10'>
          <img className='w-28 h-28 object-cover rounded-full' src={firstDoctor} alt="" />

          <article className='flex flex-col items-start justify-center'>

            <div className='flex flex-wrap gap-x-6 mt-4'>
              <label htmlFor="avatar" className='px-6 py-1 bg-blue text-center text-[12px] rounded-sm'>upload</label>
        
              { data.photo && <button onClick={deleteProfileFunc} className='px-6 py-1 bg-red-400 text-center text-[12px] rounded-sm cursor-default'>delete</button >}
              <input className='text-[12px] font-medium mb-4 text-gray-500 hidden' type="file" name="avatar" id="avatar" />
            </div>
            <p className='text-[12px] text-gray-500 mt-6'>At least 800 x 800 px recommended</p>
            <p className='text-[12px] text-gray-500'>JPG and PNG are allowed</p>
          </article>
        </div>

        {/* personal info */}
        <Form method="POST" className='w-full h-[65%] mt-14 bg-lightGrey p-4 rounded-xl flex flex-col items-start'>

          <h1 className='font-medium'>Personal Information</h1>

          <div className='w-full grid grid-cols-3 gap-x-6 gap-y-8 mt-8'>
            <ProfileInput isEdit={isEditData} label='Nama Lengkap' name='nama' defaultValue={data.nama} isAutoFocus={true}/>
            <ProfileInput isEdit={isEditData} label='Email' name='email' defaultValue={data.email} inputType='email'/>
            <ProfileInput isEdit={isEditData} label='Jenis Kelamin' name='jenisKelamin' defaultValue={data.jenisKelamin} typeInput='select' lists={['Pria', 'Wanita']}/>
            <ProfileInput isEdit={isEditData} label='No Handphone' name='nomorTelepon' defaultValue={data.nomorTelepon}/>
            <ProfileInput isEdit={isEditData} label='Tanggal Lahir' name='tanggalLahir' defaultValue={formattedDate} inputType='date'/>
            <ProfileInput isEdit={isEditData} label='Tinggi badan (cm)' name='tinggiBadan' defaultValue={tinggiBadan.toString()} inputType='number'/>
            <ProfileInput isEdit={isEditData} label='Berat Badan (cm)' name='beratBadan' defaultValue={beratBadan.toString()} inputType='number' />
            <ProfileInput isEdit={isEditData} label='Preferensi Diet' name='jenisDiet' defaultValue={jenisDiet} typeInput='select' lists={['Diet Rendah Karbohidrat', 'Diet Rendah Gula', 'Diet Vegatarian', 'Diet Rendah Lemak', 'Diet Tinggi Protein']} />
            <ProfileInput isEdit={isEditData} label='Gula Darah' name='kadarGula' defaultValue={kadarGula.toString()} inputType='number' />
            <ProfileInput isEdit={isEditData} label='Target Kesehatan' name='targetKesehatan' defaultValue={targetKesehatan} typeInput='select' lists={['Menurunkan Berat Badan', 'Mempertahankan Berat Badan', 'Menaikkan Berat Badan']}/>
            <ProfileInput isEdit={isEditData} label='Kondisi Tubuh' name='kondisiTubuh' defaultValue={kondisiTubuh} typeInput='select' lists={['Sehat', 'Cukup Sehat', 'Kurang Sehat', 'Tidak Sehat']}/>
          </div>

          <button type='submit' className={`${isEditData ? 'visible' : 'invisible'} mr-auto bg-blue px-4 py-2 rounded-md font-medium mt-10 text-small`}>Save changes</button>
        </Form>
      

      </section>


      <section className="col-span-4 bg-white rounded-xl flex flex-col justify-start py-8 px-4">
        <h1 className='text-center text-xl font-semibold text-grey'> Additional Report </h1>

        {/* STATUS */}
        <div className='flex w-full gap-x-6 my-6'>
            <div className='p-2 flex-1 bg-lightGrey rounded-md'>
              <h5 className='text-center text-medium'>BMI</h5>
              <h1 className='text-center text-xl font-semibold my-4'>{IBMStatus}</h1>
              <h5 className='text-small text-center'>BMI - {IBM}</h5>
            </div>

            <div className='p-2 flex-1 bg-lightGrey rounded-md'>
              <h5 className='text-center text-medium'>Gula Darah</h5>
              <h1 className='text-center text-xl font-semibold my-4'>{statusKadarGula}</h1>
              <h5 className='text-small text-center'>Gula - {kadarGula}/mg</h5>
            </div>

        </div>


        <section className="w-full px-4 flex flex-col gap-y-6 mt-4">
          <div className=''>
            <h3 className='font-medium text-medium'>Status Gula & Obesitas</h3>
            <h5 className='flex mt-2 gap-x-4'>
              <span className={`px-4 py-2 ${ statusKadarGula === 'Normal' ? 'bg-green-300' : ( statusKadarGula === 'Pre Diabetes' ? 'bg-yellow-300' : 'bg-red-300' ) } rounded-full text-small`}>{statusKadarGula} </span>
              <span className={`px-4 py-2 ${ IBMStatus === 'Sehat' ? 'bg-green-300' : ( IBMStatus === 'Kelebihan' ? 'bg-yellow-300' : ( IBMStatus === 'Kekurangan' ? 'bg-blue' : 'bg-red-600' ) ) } rounded-full text-small`}>{IBMStatus}</span>
            </h5>
          </div>

          <div className='m'>
            <h3 className='font-medium text-medium'>Artikel yang disukai</h3>
            <h5 className='text-gray-500 text-small'> 5 Artikel </h5>
          </div>

          <div className=''>
            <h3 className='font-medium text-medium'>Artikel yang disimpan</h3>
            <h5 className='text-gray-500 text-small'> 5 Artikel </h5>
          </div>

          <div className=''>
            <h3 className='font-medium text-medium'>Login sejak</h3>
            <h5 className='text-gray-500 text-small mt-2'> {dateOnly} </h5>
          </div>
          
          <div className=''>
            <h3 className='font-medium text-medium'>Terakhir update</h3>
            <h5 className='text-gray-500 text-small mt-2'> {terakhirUpdate} </h5>
          </div>
        </section>
        
      </section>
    </div>
  )
}

export default ProfilePage
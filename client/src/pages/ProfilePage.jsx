import { Edit, X } from 'lucide-react'
import { firstDoctor } from '../assets/images'
import { ProfileInput } from '../components'
import { NavLink, useLocation } from 'react-router-dom'

export const actionProfilePage = async({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return null;
}

export const loaderProfilePage = async({ request }) => {
  return null;
}

const ProfilePage = () => {

  const queryParams = new URLSearchParams(useLocation().search).get('edit');
  const isEditData = queryParams === 'true';  

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

            <div className='flex flex-wrap gap-x-6'>
              <label htmlFor="avatar" className='px-6 py-1 bg-blue text-center text-[12px] rounded-sm'>upload</label>
              <button className='px-6 py-1 bg-red-400 text-center text-[12px] rounded-sm'>delete</button >
              <input className='text-[12px] font-medium mb-4 text-gray-500 hidden' type="file" name="avatar" id="avatar" />
            </div>
            <p className='text-[12px] text-gray-500 mt-6'>At least 800 x 800 px recommended</p>
            <p className='text-[12px] text-gray-500'>JPG and PNG are allowed</p>
          </article>
        </div>

        {/* personal info */}
        <div className='w-full h-[65%] mt-14 bg-lightGrey p-4 rounded-xl flex flex-col items-start'>

          <h1 className='font-medium'>Personal Information</h1>

          <div className='w-full grid grid-cols-3 gap-x-6 gap-y-8 mt-8'>
            <ProfileInput isEdit={isEditData} label='First Name' name='firstname' defaultValue='Aan' isAutoFocus={true} />
            <ProfileInput isEdit={isEditData} label='Last Name' name='lastname' defaultValue='Bahudin' />
            <ProfileInput isEdit={isEditData} label='Email' name='email' defaultValue='aanbahudin$gmail.com' />
            <ProfileInput isEdit={isEditData} label='Jenis Kelamin' name='jenisKelamin' defaultValue='Pria' />
            <ProfileInput isEdit={isEditData} label='No Handphone' name='nohp' defaultValue='0812 7334 0834' />
            <ProfileInput isEdit={isEditData} label='TanggalLahir' name='tanggalLahir' defaultValue='04 Desember 2023' />
            <ProfileInput isEdit={isEditData} label='Preferensi Diet' name='preferensiDiet' defaultValue='Vegetarian' />
            <ProfileInput isEdit={isEditData} label='Target Kesehatan' name='targetKesehatan' defaultValue='Menurunkan Berat' />
            <ProfileInput isEdit={isEditData} label='Kondisi Tubuh' name='kondisiTubuh' defaultValue='Kurang Sehat' />
          </div>

        <button className={`${isEditData ? 'visible' : 'invisible'} mr-auto bg-blue px-4 py-2 rounded-md font-medium mt-10 text-small`}>Save changes</button>
        </div>
      

      </section>


      <section className="col-span-4 bg-white rounded-xl flex flex-col justify-start py-8 px-4">
        <h1 className='text-center text-xl font-semibold text-grey'> Additional Report </h1>

        {/* STATUS */}
        <div className='flex w-full gap-x-6 my-6'>
            <div className='p-2 flex-1 bg-lightGrey rounded-md'>
              <h5 className='text-center text-medium'>BMI</h5>
              <h1 className='text-center text-xl font-semibold my-4'>Obesitas</h1>
              <h5 className='text-small text-center'>BMI - 43,42</h5>
            </div>

            <div className='p-2 flex-1 bg-lightGrey rounded-md'>
              <h5 className='text-center text-medium'>Gula Darah</h5>
              <h1 className='text-center text-xl font-semibold my-4'>Rendah</h1>
              <h5 className='text-small text-center'>Gula - 43,42/mg</h5>
            </div>

        </div>


        <section className="w-full px-4 flex flex-col gap-y-6 mt-4">
          <div className=''>
            <h3 className='font-medium text-medium'>Status Gula & Obesitas</h3>
            <h5 className='flex mt-2 gap-x-4'>
              <span className='px-4 py-2 bg-green-400 rounded-full text-small'>Rendah </span>
              <span className='px-4 py-2 bg-red-400 rounded-full text-small'>Obesitas</span>
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
            <h5 className='text-gray-500 text-small'> 4 Desember 2023 </h5>
          </div>
        </section>
        
      </section>
    </div>
  )
}

export default ProfilePage
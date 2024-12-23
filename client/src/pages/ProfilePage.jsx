import { firstDoctor } from '../assets/images'
import { FormInput } from '../components'

const ProfilePage = () => {
  return (
    <div className='p-10 bg-lightGrey h-full overflow-y-auto grid grid-cols-12 gap-x-6'>

      <section className='bg-white col-span-8 rounded-3xl px-10 py-8'>
       
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
        <div className='w-full mt-20 bg-lightGrey p-4 rounded-xl'>
          <h1 className='font-medium mb-6'>Personal info</h1>

          <div className='w-full grid grid-cols-3 gap-x-6'>
            <FormInput 
              defaultValue="Zero"
              inputType='text'
              isFirstItem={false}
              labelText="Full Name"
              name='firstname'
              placeholder=''
            />

            <FormInput 
              defaultValue="Kino"
              inputType='text'
              isFirstItem={false}
              labelText="Last Name"
              name='lastname'
              placeholder=''
            />

            <FormInput 
              defaultValue="zerokino@gmail.com"
              inputType='text'
              isFirstItem={false}
              labelText="Email"
              name='email'
              placeholder=''
            />

            <FormInput 
              defaultValue="zerokino@gmail.com"
              inputType='text'
              isFirstItem={false}
              labelText="Email"
              name='email'
              placeholder=''
            />

            <FormInput 
              defaultValue="zerokino@gmail.com"
              inputType='text'
              isFirstItem={false}
              labelText="Email"
              name='email'
              placeholder=''
            />

            <FormInput 
              defaultValue="zerokino@gmail.com"
              inputType='text'
              isFirstItem={false}
              labelText="Email"
              name='email'
              placeholder=''
            />
          </div>
          <div>
            
          </div>
        </div>
      
      </section>


      <section className="col-span-4 bg-white rounded-3xl">
        profile additional information
      </section>
    </div>
  )
}

export default ProfilePage
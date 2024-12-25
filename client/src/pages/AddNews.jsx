import React from 'react'
import { TextEditor, FormInput, TextAreaInput, FormSelect } from '../components'

const AddNews = () => {
  return (
    <div className='w-full h-fit p-10 overflow-y-auto'>

      <h1 className='text-2xl font-medium '>Create an Article</h1>


      <h5 className='mt-12 text-xl font-medium border-b-[2px] pb-2 border-gray-500/50'>Informasi umum</h5>
      <section className='w-full grid grid-cols-4 mt-6 gap-x-10'>
        <FormInput 
          inputType='text'
          isFirstItem={true}
          labelText="Judul artikel"
          name='judul'
          placeholder='Cara mengurangi berat badan...'
          useBorder={true}
          />

        <FormInput 
          inputType='text'
          isFirstItem={true}
          labelText="Tag Artikel"
          name='judul'
          placeholder='Pola makan'
          useBorder={true}
          /> 

        <FormInput 
          inputType='text'
          labelText="Penyuting"
          name='narasumber'
          placeholder='Dr. Kino Kinora'
          useBorder={true}
        />

        <FormSelect 
          defaultValue=''
          list={['diabetes', 'obesitas']}
          labelText='Jenis Artikel'
          name='jenis'
          isFirstItem={false}
          useBorder = {true}
          />
      </section>
 
      <section className='w-full grid grid-cols-2 gap-x-10 place-items-stretch'>
        <TextAreaInput 
          name='tags'
          defaultValue=''
          labelText='Tagar'
          placeholder='#polahidup #kesehatan #diabetes' 
        />

        <TextAreaInput 
          name='referensi'
          defaultValue=''
          labelText='Referensi'
          placeholder='Newman, D. Nourish by WebMD (2018). The Benefits of Eating Breakfast.' 
        />
      </section>

      {/* editor anjay */}
      <h5 className='mt-6 text-xl font-medium border-b-[2px] pb-2 border-gray-500/50'>Struktur Artikel</h5>
      <section className='w-full mt-6'>
        <TextEditor />
      </section>

      <section className='flex items-center justify-end gap-x-6'>
        <button className='bg-red-500 text-sm font-medium px-10 py-3 rounded-md mt-6 w-48'>Reset</button>
        <button className='bg-blue text-sm font-medium px-10 py-3 rounded-md mt-6 w-48'>Create article</button>
      </section>
    </div>
  )
}

export default AddNews
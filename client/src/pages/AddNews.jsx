import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, useNavigation, redirect } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FormInput, FormSelect, TextAreaInput, Loading, FormInputProfile } from '../components'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { convertToRaw } from 'draft-js'

export const action = async({ request }) => {
  const formData = await request.formData()
  
  const file = formData.get('thumbnail');
  if (file && file.size > 500000) {
    toast.error('Ukuran gambar terlalu berat')
    return null
  }

  try {
    await customFetch.post('/news', formData);
    toast.success('Artikel ditambahkan!')
    return redirect('/admin/dashboard')
  } catch (error) {
    console.log(error.response.data.msg)
    return toast.error(error.response.data.msg)
  }
} 

const AddNews = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorContent, setEditorContent] = useState('');
  const [currentTab, setCurrentTab] = useState('first')

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const isLoading = navigation.state === 'loading'

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const content = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
    setEditorContent(content);
  };

  return (
    <Form method='POST' encType='multipart/form-data' className='w-full h-full overflow-y-auto p-10 flex items-center justify-center bg-slate-50'>
      <section className='w-full h-full '>
        <h1 className='text-3xl text-slate-800 font-semibold'>Buat Artikel Baru</h1>
        <p className='text-slate-600 w-[80%] mt-2'>Mulai tulis artikel baru di sini. Sampaikan informasi berharga untuk membantu pengguna memahami lebih banyak tentang kesehatan, obesitas, dan diabetes.</p>

        {/* TABS */}
        <article className='w-full  mt-10  rounded-lg flex items-center justify-center flex-wrap border-[2px] border-slate-200 bg-slate-100'>
          <h1 onClick={() => setCurrentTab('first')} className={`${currentTab === 'first' && 'bg-blue/60 text-slate-900 '} py-3 rounded-lg flex-1 text-center cursor-default font-semibold text-slate-600 duration-200 ease-in-out`}>Informasi Umum</h1>
          <h1 onClick={() => setCurrentTab('second')} className={`${currentTab === 'second' && 'bg-blue/60 text-slate-900 '} py-3 rounded-lg flex-1 text-center cursor-default font-semibold text-slate-600 duration-200 ease-in-out`}>Struktur Artikel</h1>
          <h1 onClick={() => setCurrentTab('third')} className={`${currentTab === 'third' && 'bg-blue/60 text-slate-900 '} py-3 rounded-lg flex-1 text-center cursor-default font-semibold text-slate-600 duration-200 ease-in-out`}>Review </h1>
        </article>

        {/* KONTAINER KONTEN */}
        <article className='w-full my-16'>
          
          <section className={`${currentTab !== 'first' && 'hidden'} w-full`}>
            <div className='w-full grid grid-cols-3 gap-x-4'>
              <FormInputProfile inputName='judulArtikel' type='text' label='Judul Artikel' isRequired={true} placeholder='Cara mencegah diabetes' />
              <FormInputProfile inputName='tagArtikel' type='text' label='Tag Artikel' isRequired={true} placeholder='Hidup sehat' />
              <FormInputProfile inputName='penyutingArtikel' type='text' label='Penyunting' isRequired={true} placeholder='Dr. Amir Khan' />
              <FormSelect inputName='jenisArtikel' label='Jenis artikel' list={['Diabetes', 'Obesitas']} />
              <FormInputProfile inputName='thumbnail' type='file' label='Gambar' isRequired={true}  />
            </div>

            <div className='w-full mt-4 grid grid-cols-3 gap-4'>
              <TextAreaInput labelText='Deskripsi artikel' name='deskripsi' placeholder='Jelaskan mengenai artikel anda ..' />
              <TextAreaInput labelText='Tagar' name='tagar' placeholder='#diabetes #obesitas #hidupsehat' />
              <TextAreaInput labelText='Referensi' name='referensi' placeholder='Newman, D. Nourish by WebMD (2018). The Benefits of Eating Breakfast.t' />
            </div>
          </section>

          <section className={`${currentTab !== 'second' && 'hidden'} w-[95%] mx-auto  mt-6 .rdw-editor-wrapper`}>
            <div className="w-[95%] mx-auto bg-white h-[70vh] overflow-y-auto rounded-lg border-[1px] border-grey px-6 wysiwyg-container rdw-editor-wrapper">
              <Editor
                placeholder="Start typing articles..."
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'fontSize',
                    'list',
                    'textAlign',
                    'link',
                    'embedded',
                    'image',
                    'remove',
                    'history',
                  ], // Hilangkan fontFamily dari daftar
                  indent: {
                    options: ['indent', 'outdent']
                  },
                }}
                editorState={editorState}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange} // Gunakan fungsi ini untuk menangani perubahan
              />
              <input type="hidden" name='editorContent' value={editorContent} />
            </div>
          </section>

        </article>

        <div className='bg-white text-white'>test</div>
      </section>  
    </Form>
  );
};

export default AddNews;
    // <Form method="POST" encType='multipart/form-data' className='w-full h-fit p-10 overflow-y-auto'>

    //   <h1 className='text-2xl font-medium '>Buat Artikel Baru</h1>
    //   <h5 className='mt-12 text-xl font-medium border-b-[2px] pb-2 border-gray-500/50'>Informasi umum</h5>
    //   <section className='w-full grid grid-cols-3 my-6 gap-x-10'>
    //     <FormInput 
    //       inputType='text'
    //       isFirstItem={true}
    //       labelText="Judul artikel"
    //       name='judulArtikel'
    //       placeholder='Cara mengurangi berat badan...'
    //       useBorder={true}
    //       />

    //     <FormInput 
    //       inputType='text'
    //       isFirstItem={true}
    //       labelText="Tag Artikel"
    //       name='tagArtikel'
    //       placeholder='Pola makan'
    //       useBorder={true}
    //       /> 

    //     <FormInput 
    //       inputType='text'
    //       labelText="Penyuting Artikel"
    //       name='penyutingArtikel'
    //       placeholder='Dr. Kino Kinora'
    //       useBorder={true}
    //     />

    //     <FormSelect 
    //       defaultValue=''
    //       list={['Diabetes', 'Obesitas']}
    //       labelText='Jenis Artikel'
    //       name='jenisArtikel'
    //       useBorder = {true}
    //       />

    //     <FormInput 
    //       inputType='file'
    //       labelText="Gambar Thumbnail"
    //       name='thumbnail'
    //       id='thumbnail'
    //       placeholder='Cara mengurangi berat badan...'
    //       useBorder={true}
    //       />
    //   </section>
 
    //   <section className='w-full grid grid-cols-3 gap-x-4 place-items-stretch'>
    //     <TextAreaInput 
    //       name='deskripsi'
    //       defaultValue=''
    //       labelText='deskripsi'
    //       placeholder='isi deskripsi artikel ...' 
    //     />
        
    //     <TextAreaInput 
    //       name='tagar'
    //       defaultValue=''
    //       labelText='Tagar'
    //       placeholder='#polahidup #kesehatan #diabetes' 
    //     />

    //     <TextAreaInput 
    //       name='referensi'
    //       defaultValue=''
    //       labelText='Referensi'
    //       placeholder='Newman, D. Nourish by WebMD (2018). The Benefits of Eating Breakfast.' 
    //     />
    //   </section>

    //   {/* editor anjay */}
    //   <h5 className='mt-6 text-xl font-medium border-b-[2px] pb-2 border-gray-500/50'>Struktur Artikel</h5>
    //   <section className='w-full mt-6 .rdw-editor-wrapper'>
    //     <div className="w-[95%] mx-auto bg-white h-[70vh] overflow-y-auto rounded-lg border-[1px] border-grey px-6 wysiwyg-container rdw-editor-wrapper">
    //       <Editor
    //         placeholder="Start typing articles..."
    //         toolbar={{
    //           options: [
    //             'inline',
    //             'blockType',
    //             'fontSize',
    //             'list',
    //             'textAlign',
    //             'link',
    //             'embedded',
    //             'image',
    //             'remove',
    //             'history',
    //           ], // Hilangkan fontFamily dari daftar
    //           indent: {
    //             options: ['indent', 'outdent']
    //           },
    //         }}
    //         editorState={editorState}
    //         wrapperClassName="wrapperClassName"
    //         editorClassName="editorClassName"
    //         onEditorStateChange={onEditorStateChange} // Gunakan fungsi ini untuk menangani perubahan
    //       />

    //       <input type="hidden" name='editorContent' value={editorContent} />
    //     </div>
    //   </section>

    //   <section className='flex items-center justify-end gap-x-6'>
    //     <button type='reset' className='bg-red-500 text-sm px-10 py-3 rounded-md mt-6 w-48'>Reset</button>
    //     <button type='submit' disabled={isSubmitting} className='bg-blue text-sm px-10 py-3 rounded-md mt-6 w-48'>{ isSubmitting ? 'Membuat ...' : 'Publish' }</button>
    //   </section>
    // </Form>



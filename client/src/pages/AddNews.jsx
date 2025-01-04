import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, useNavigation } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FormInput, TextAreaInput, FormSelect, Loading } from '../components'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { convertToRaw } from 'draft-js'

export const action = async({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
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

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const isLoading = navigation.state === 'loading'

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const content = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
    setEditorContent(content);
  };

  if (isLoading) {
    return <Loading />
  }

  

  return (
    <Form method="POST" encType='multipart/form-data' className='w-full h-fit p-10 overflow-y-auto'>

      <h1 className='text-2xl font-medium '>Buat Artikel Baru</h1>
      <h5 className='mt-12 text-xl font-medium border-b-[2px] pb-2 border-gray-500/50'>Informasi umum</h5>
      <section className='w-full grid grid-cols-3 my-6 gap-x-10'>
        <FormInput 
          inputType='text'
          isFirstItem={true}
          labelText="Judul artikel"
          name='judulArtikel'
          placeholder='Cara mengurangi berat badan...'
          useBorder={true}
          />

        <FormInput 
          inputType='text'
          isFirstItem={true}
          labelText="Tag Artikel"
          name='tagArtikel'
          placeholder='Pola makan'
          useBorder={true}
          /> 

        <FormInput 
          inputType='text'
          labelText="Penyuting Artikel"
          name='penyutingArtikel'
          placeholder='Dr. Kino Kinora'
          useBorder={true}
        />

        <FormSelect 
          defaultValue=''
          list={['Diabetes', 'Obesitas']}
          labelText='Jenis Artikel'
          name='jenisArtikel'
          useBorder = {true}
          />

        <FormInput 
          inputType='file'
          labelText="Gambar Thumbnail"
          name='thumbnail'
          id='thumbnail'
          placeholder='Cara mengurangi berat badan...'
          useBorder={true}
          />
      </section>
 
      <section className='w-full grid grid-cols-3 gap-x-4 place-items-stretch'>
        <TextAreaInput 
          name='deskripsi'
          defaultValue=''
          labelText='deskripsi'
          placeholder='isi deskripsi artikel ...' 
        />
        
        <TextAreaInput 
          name='tagar'
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
      <section className='w-full mt-6 .rdw-editor-wrapper'>
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

      <section className='flex items-center justify-end gap-x-6'>
        <button type='reset' className='bg-red-500 text-sm px-10 py-3 rounded-md mt-6 w-48'>Reset</button>
        <button type='submit' disabled={isSubmitting} className='bg-blue text-sm px-10 py-3 rounded-md mt-6 w-48'>{ isSubmitting ? 'Membuat ...' : 'Publish' }</button>
      </section>
    </Form>
  );
};

export default AddNews;



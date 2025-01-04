import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, useLoaderData, useNavigation, redirect } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FormInput, TextAreaInput, FormSelect, Loading } from '../components'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { convertToRaw, convertFromRaw } from 'draft-js'


export const loader = async({ params }) => {
  const id = params.id
  try {
    const { data } = await customFetch.get(`/news/${id}`)
    return data
  } catch (error) {
    toast.error(error.response.data.msg)
    return error
  }
}

export const action = async({ request, params }) => {
  const formData = await request.formData()
  const file = formData.get('thumbnail');
  if (file && file.size > 500000) {
    toast.error('Ukuran gambar terlalu berat')
    return null
  }

  try {
    await customFetch.patch(`/news/${params.id}`, formData);
    toast.success('Berhasil diubah')
    return redirect('/admin/dashboard')
  } catch (error) {
    console.log(error.response.data.msg)
    return toast.error(error.response.data.msg)
  }
}

const EditNews = () => {

  const { news : data } = useLoaderData()
  const newsData = data?.editorContent ? convertFromRaw(JSON.parse(data.editorContent)) : null;
  const [editorState, setEditorState] = useState(EditorState.createWithContent(newsData));

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const isLoading = navigation.state === 'loading'

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <Form method="POST" encType='multipart/form-data' className='w-full h-fit p-10 overflow-y-auto'>
    
          <h1 className='text-2xl font-medium '>Edit Artikel</h1>
          <h5 className='mt-12 text-xl font-medium border-b-[2px] pb-2 border-gray-500/50'>Informasi umum</h5>
          <section className='w-full grid grid-cols-3 my-6 gap-x-10'>
            <FormInput 
              inputType='text'
              isFirstItem={true}
              labelText="Judul artikel"
              defaultValue={data.judulArtikel}
              name='judulArtikel'
              placeholder='Cara mengurangi berat badan...'
              useBorder={true}
              />
    
            <FormInput 
              inputType='text'
              isFirstItem={true}
              labelText="Tag Artikel"
              defaultValue={data.tagArtikel}
              name='tagArtikel'
              placeholder='Pola makan'
              useBorder={true}
              /> 
    
            <FormInput 
              inputType='text'
              labelText="Penyuting Artikel"
              name='penyutingArtikel'
              defaultValue={data.penyutingArtikel}
              placeholder='Dr. Kino Kinora'
              useBorder={true}
            />
    
            <FormSelect 
              defaultValue={data.jenisArtikel}
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
              useBorder={true}
              />
          </section>
     
          <section className='w-full grid grid-cols-3 gap-x-4 place-items-stretch'>
            <TextAreaInput 
              name='deskripsi'
              defaultValue={data.deskripsi}
              labelText='deskripsi'
              placeholder='isi deskripsi artikel ...' 
            />
            
            <TextAreaInput 
              name='tagar'
              defaultValue={data.tagar}
              labelText='Tagar'
              placeholder='#polahidup #kesehatan #diabetes' 
            />
    
            <TextAreaInput 
              name='referensi'
              defaultValue={data.referensi}
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
    
              <input type="hidden" name='editorContent' value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))} />
            </div>
          </section>
    
          <section className='flex items-center justify-end gap-x-6'>
            <button type='submit' disabled={isSubmitting} className='bg-blue text-sm px-10 py-3 rounded-md mt-6 w-48'>{ isSubmitting ? 'Menyimpan ...' : 'Edit' }</button>
          </section>
        </Form>
  )
}

export default EditNews
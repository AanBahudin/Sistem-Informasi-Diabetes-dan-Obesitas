import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, useLoaderData, useNavigation, redirect } from 'react-router-dom';
import { FormInputProfile, TextAreaInput, FormSelect, Loading } from '../components'
import { toast } from 'react-toastify'
import { LoaderCircle } from 'lucide-react';
import { stateToHTML } from 'draft-js-export-html';
import customFetch from '../utils/customFetch'
import { handleToast } from '../utils/constants';
import { convertToRaw, convertFromRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


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
    handleToast('warning', 'Peringatan', 'Ukuran gambar maksimal 5 MB', 2000)
    return null
  }

  try {
    await customFetch.patch(`/news/${params.id}`, formData);
    handleToast('success', 'Diubah', 'Artikel berhasil diperbaharui', 2000)
    return redirect('/admin/dashboard')
  } catch (error) {
    console.log(error.response.data.msg)
    handleToast('error', 'Terjadi Kesalahan', error.response?.data?.msg, 2000)
  }
}

const EditNews = () => {

  const { news : data } = useLoaderData();
  
  const [currentTab, setCurrentTab] = useState("first")
  const newsData = data?.editorContent ? convertFromRaw(JSON.parse(data.editorContent)) : null;
  const [editorState, setEditorState] = useState(EditorState.createWithContent(newsData));
  const [reviewContent, setReviewContent] = useState(stateToHTML(newsData));

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const onEditorStateChange = (newEditorState) => {
    const rawContent = convertToRaw(newEditorState.getCurrentContent());
    const htmlContent = stateToHTML(newEditorState.getCurrentContent());
    setReviewContent(htmlContent);
    setEditorState(newEditorState);
  };

  return (
    <Form method='POST' encType='multipart/form-data' className='w-full h-full overflow-y-auto no-scrollbar p-10 flex items-center justify-center bg-slate-50 no-scrollbar'>
      <section className='w-full h-full no-scrollbar'>
        <h1 className='text-3xl text-slate-800 font-semibold w-full flex justify-between items-center'>
          Buat Artikel Baru
          <button className='text-sm bg-blue/70 py-2 px-10 rounded-lg flex items-center justify-center gap-x-2'>
            {isSubmitting && <LoaderCircle className='w-4 h-4 animate-spin stroke-white' />}
            {isSubmitting ? 'Proses' : 'Publish'}
          </button>
        </h1>
        <p className='text-slate-600 w-[80%] mt-2'>Mulai tulis artikel baru di sini. Sampaikan informasi berharga untuk membantu pengguna memahami lebih banyak tentang kesehatan, obesitas, dan diabetes.</p>

        {/* TABS */}
        <article className='w-full  mt-10  rounded-lg flex items-center justify-center flex-wrap border-[2px] border-slate-200 bg-slate-100'>
          <h1 onClick={() => setCurrentTab('first')} className={`${currentTab === 'first' && 'bg-blue/60 text-slate-900 '} py-3 rounded-lg flex-1 text-center cursor-default font-semibold text-slate-600 duration-200 ease-in-out`}>Informasi Umum</h1>
          <h1 onClick={() => setCurrentTab('second')} className={`${currentTab === 'second' && 'bg-blue/60 text-slate-900 '} py-3 rounded-lg flex-1 text-center cursor-default font-semibold text-slate-600 duration-200 ease-in-out`}>Struktur Artikel</h1>
          <h1 onClick={() => setCurrentTab('third')} className={`${currentTab === 'third' && 'bg-blue/60 text-slate-900 '} py-3 rounded-lg flex-1 text-center cursor-default font-semibold text-slate-600 duration-200 ease-in-out`}>Review </h1>
        </article>

        {/* KONTAINER KONTEN */}
        <article className='w-full my-16'>
          
          <section className={`${currentTab !== 'first' && 'hidden'} w-full duration-200 ease-in-out`}>
            <div className='w-full grid grid-cols-3 gap-x-4'>
              <FormInputProfile inputName='judulArtikel' type='text' label='Judul Artikel' isRequired={true} placeholder='Cara mencegah diabetes' defaultValue={data.judulArtikel} />
              <FormInputProfile inputName='tagArtikel' type='text' label='Tag Artikel' isRequired={true} placeholder='Hidup sehat' defaultValue={data.tagArtikel} />
              <FormInputProfile inputName='penyutingArtikel' type='text' label='Penyunting' isRequired={true} placeholder='Dr. Amir Khan'  defaultValue={data.penyutingArtikel}/>
              <FormSelect inputName='jenisArtikel' label='Jenis artikel' list={['Diabetes', 'Obesitas']} defaultValue={data.jenisArtikel} />
              <FormInputProfile inputName='thumbnail' type='file' label='Gambar' isRequired={true} defaultValue={data.thumbnail} />
            </div>

            <div className='w-full mt-4 grid grid-cols-3 gap-4'>
              <TextAreaInput labelText='Deskripsi artikel' name='deskripsi' placeholder='Jelaskan mengenai artikel anda ..' defaultValue={data.deskripsi}/>
              <TextAreaInput labelText='Tagar' name='tagar' placeholder='#diabetes #obesitas #hidupsehat'  defaultValue={data.tagar}/>
              <TextAreaInput labelText='Referensi' name='referensi' placeholder='Newman, D. Nourish by WebMD (2018). The Benefits of Eating Breakfast.t'  defaultValue={data.referensi}/>
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
              <input type="hidden" name='editorContent' value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))} />
            </div>
          </section>

          <section className={`${currentTab !== 'third' && 'hidden'} w-[95%] mx-auto  mt-6 .rdw-editor-wrapper`}>
            <div className="w-[95%] p-6 mx-auto bg-white h-[70vh] overflow-y-auto rounded-lg border-[1px] border-grey px-6 wysiwyg-container rdw-editor-wrapper" dangerouslySetInnerHTML={{ __html: reviewContent }} />
          </section>

        </article>

        <div className='bg-white text-white'>test</div>
      </section>  
    </Form>
  )
}

export default EditNews
// <Form method="POST" encType='multipart/form-data' className='w-full h-fit p-10 overflow-y-auto'>

//       <h1 className='text-2xl font-medium '>Edit Artikel</h1>
//       <h5 className='mt-12 text-xl font-medium border-b-[2px] pb-2 border-gray-500/50'>Informasi umum</h5>
//       <section className='w-full grid grid-cols-3 my-6 gap-x-10'>
//         <FormInput 
//           inputType='text'
//           isFirstItem={true}
//           labelText="Judul artikel"
//           defaultValue={data.judulArtikel}
//           name='judulArtikel'
//           placeholder='Cara mengurangi berat badan...'
//           useBorder={true}
//           />

//         <FormInput 
//           inputType='text'
//           isFirstItem={true}
//           labelText="Tag Artikel"
//           defaultValue={data.tagArtikel}
//           name='tagArtikel'
//           placeholder='Pola makan'
//           useBorder={true}
//           /> 

//         <FormInput 
//           inputType='text'
//           labelText="Penyuting Artikel"
//           name='penyutingArtikel'
//           defaultValue={data.penyutingArtikel}
//           placeholder='Dr. Kino Kinora'
//           useBorder={true}
//         />

//         <FormSelect 
//           defaultValue={data.jenisArtikel}
//           list={['Diabetes', 'Obesitas']}
//           labelText='Jenis Artikel'
//           name='jenisArtikel'
//           useBorder = {true}
//           />

//         <FormInput 
//           inputType='file'
//           labelText="Gambar Thumbnail"
//           name='thumbnail'
//           id='thumbnail'
//           useBorder={true}
//           />
//       </section>
 
//       <section className='w-full grid grid-cols-3 gap-x-4 place-items-stretch'>
//         <TextAreaInput 
//           name='deskripsi'
//           defaultValue={data.deskripsi}
//           labelText='deskripsi'
//           placeholder='isi deskripsi artikel ...' 
//         />
        
//         <TextAreaInput 
//           name='tagar'
//           defaultValue={data.tagar}
//           labelText='Tagar'
//           placeholder='#polahidup #kesehatan #diabetes' 
//         />

//         <TextAreaInput 
//           name='referensi'
//           defaultValue={data.referensi}
//           labelText='Referensi'
//           placeholder='Newman, D. Nourish by WebMD (2018). The Benefits of Eating Breakfast.' 
//         />
//       </section>

//       {/* editor anjay */}
//       <h5 className='mt-6 text-xl font-medium border-b-[2px] pb-2 border-gray-500/50'>Struktur Artikel</h5>
//       <section className='w-full mt-6 .rdw-editor-wrapper'>
//         <div className="w-[95%] mx-auto bg-white h-[70vh] overflow-y-auto rounded-lg border-[1px] border-grey px-6 wysiwyg-container rdw-editor-wrapper">
//           <Editor
//             placeholder="Start typing articles..."
//             toolbar={{
//               options: [
//                 'inline',
//                 'blockType',
//                 'fontSize',
//                 'list',
//                 'textAlign',
//                 'link',
//                 'embedded',
//                 'image',
//                 'remove',
//                 'history',
//               ], // Hilangkan fontFamily dari daftar
//               indent: {
//                 options: ['indent', 'outdent']
//               },
//             }}
//             editorState={editorState}
//             wrapperClassName="wrapperClassName"
//             editorClassName="editorClassName"
//             onEditorStateChange={onEditorStateChange} // Gunakan fungsi ini untuk menangani perubahan
//           />

//           <input type="hidden" name='editorContent' value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))} />
//         </div>
//       </section>

//       <section className='flex items-center justify-end gap-x-6'>
//         <button type='submit' disabled={isSubmitting} className='bg-blue text-sm px-10 py-3 rounded-md mt-6 w-48'>{ isSubmitting ? 'Menyimpan ...' : 'Edit' }</button>
//       </section>
//     </Form>
import React, { useState, useRef, useCallback } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, useNavigation, redirect } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FormInputProfile, FormSelect, TextAreaInput } from '../components';
import customFetch from '../utils/customFetch';
import { stateToHTML } from 'draft-js-export-html';
import { LoaderCircle } from 'lucide-react';
import { handleToast } from '../utils/constants';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('thumbnail');

  console.log(Object.fromEntries(formData));
  
  
  if (file && file.size > 5000000) {
    handleToast('warning', 'Terjadi Kesalahan', 'Ukuran gambar maksimal 5 MB', 2000);
    return null;
  }

  try {
    await customFetch.post('/news', formData);
    handleToast('success', 'Artikel Ditambahkan', 'Artikel berhasil ditambahkan', 2000);
    return redirect('/admin/dashboard');
  } catch (error) {
    return handleToast('error', 'Terjadi Kesalahan', error.response?.data?.msg, 2000);
  }
};

const AddNews = () => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorContent, setEditorContent] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [currentTab, setCurrentTab] = useState('first');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const onEditorStateChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
    const rawContent = convertToRaw(newEditorState.getCurrentContent());
    setEditorContent(JSON.stringify(rawContent)); // Simpan dalam format string
    console.log(editorContent)
    setReviewContent(stateToHTML(newEditorState.getCurrentContent()));
  }, []);  

  return (
    <Form method="POST" encType="multipart/form-data" className="w-full h-full overflow-y-auto p-10 flex items-center justify-center bg-slate-50">
      <section className="w-full h-full">
        <h1 className='text-3xl text-slate-800 font-semibold flex justify-between items-center'>
          Buat Artikel Baru
          <button className='text-sm bg-blue/70 py-2 px-10 rounded-lg flex items-center gap-x-2'>
            {isSubmitting && <LoaderCircle className='w-4 h-4 animate-spin stroke-white' />}
            {isSubmitting ? 'Proses' : 'Publish'}
          </button>
        </h1>

        <article className='w-full mt-10 rounded-lg flex items-center justify-center flex-wrap border-2 border-slate-200 bg-slate-100'>
          <h1 onClick={() => setCurrentTab('first')} className={`${currentTab === 'first' && 'bg-blue/60 text-slate-900'} py-3 rounded-lg flex-1 text-center cursor-pointer font-semibold text-slate-600`}>Informasi Umum</h1>
          <h1 onClick={() => setCurrentTab('second')} className={`${currentTab === 'second' && 'bg-blue/60 text-slate-900'} py-3 rounded-lg flex-1 text-center cursor-pointer font-semibold text-slate-600`}>Struktur Artikel</h1>
          <h1 onClick={() => setCurrentTab('third')} className={`${currentTab === 'third' && 'bg-blue/60 text-slate-900'} py-3 rounded-lg flex-1 text-center cursor-pointer font-semibold text-slate-600`}>Review</h1>
        </article>

        <article className="w-full my-16">
          <section className={`${currentTab !== 'first' && 'hidden'} w-full`}> 
            <div className='w-full grid grid-cols-3 gap-x-4'>
              <FormInputProfile inputName='judulArtikel' type='text' label='Judul Artikel' isRequired placeholder='Cara mencegah diabetes' />
              <FormInputProfile inputName='tagArtikel' type='text' label='Tag Artikel' isRequired placeholder='Hidup sehat' />
              <FormInputProfile inputName='penyutingArtikel' type='text' label='Penyunting' isRequired placeholder='Dr. Amir Khan' />
              <FormSelect inputName='jenisArtikel' label='Jenis artikel' list={['Diabetes', 'Obesitas']} />
              <FormInputProfile inputName='thumbnail' type='file' label='Gambar' isRequired />
            </div>
            <div className='w-full mt-4 grid grid-cols-3 gap-4'>
              <TextAreaInput labelText='Deskripsi artikel' name='deskripsi' placeholder='Jelaskan mengenai artikel anda ..' />
              <TextAreaInput labelText='Tagar' name='tagar' placeholder='#diabetes #obesitas #hidupsehat' />
              <TextAreaInput labelText='Referensi' name='referensi' placeholder='Newman, D. Nourish by WebMD (2018)' />
            </div>
          </section>
          
            <div className={`w-[95%] mx-auto bg-white h-[70vh] overflow-y-auto rounded-lg border p-6 wysiwyg-container ${currentTab !== 'second' ? 'hidden' : null}`}>
              <Editor
                ref={editorRef}
                placeholder="Mulai mengetik artikel..."
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image', 'history'],
                  image: { uploadEnabled: true, alignmentEnabled: true, previewImage: true }
                }}
              />
              <input type="hidden" name="editorContent" value={editorContent} />
            </div>
          {currentTab === 'third' && (
            <div className="w-[95%] h-fit mx-auto bg-white  rounded-lg p-6 wysiwyg-container overflow-y-scroll">
              <Editor editorState={editorState} toolbarHidden readOnly />
            </div>
          )}
        </article>
      </section>
    </Form>
  );
};

export default AddNews;

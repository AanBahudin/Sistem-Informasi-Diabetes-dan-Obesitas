import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = () => {
  // Menggunakan useState untuk menggantikan state pada class component
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Fungsi untuk menangani perubahan editor state
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div className="w-[90%] mx-auto bg-white h-[70ch] rounded-lg border-[1px] border-grey px-6 wysiwyg-container rdw-editor-wrapper">
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
        }}
        editorState={editorState}
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange} // Gunakan fungsi ini untuk menangani perubahan
      />
    </div>
  );
};

export default TextEditor;

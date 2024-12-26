import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className='w-full bg-white h-[70ch] rounded-lg border-[1px] border-grey px-6 wysiwyg-container rdw-editor-wrapper'>

        <Editor
          placeholder='Start typing articles...'
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
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}

export default TextEditor
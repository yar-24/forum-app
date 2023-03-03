import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import useInput from '../hooks/useInput';
import EditorToolbar, { formats, modules } from './EditorToolbar';

function NewDiskusiInput({ onCreateThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useState('');

  return (
    <form onSubmit={(e) => e.preventDefault(onCreateThread({
      title, body, category,
    }))}
    >
      <input type="text" className="create__input" placeholder="Judul" value={title} onChange={onTitleChange} />
      <input type="text" className="create__input" placeholder="Kategori" value={category} onChange={onCategoryChange} />
      <EditorToolbar toolbarId="t1" />
      <ReactQuill
        theme="snow"
        value={body}
        onChange={onBodyChange}
        placeholder="Tulis sesuatu"
        modules={modules('t1')}
        formats={formats}
      />
      <button>Buat</button>
    </form>
  );
}

NewDiskusiInput.propTypes = {
  onCreateThread: PropTypes.func.isRequired,
};

export default NewDiskusiInput;

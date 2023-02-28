/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import useInput from '../hooks/useInput';
import EditorToolbar, { formats, modules } from '../components/EditorToolbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import Swal from 'sweetalert2';

function NewDiskusiPage() {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  // const [body, onBodyChange] = useInput('');
  const [body, onBodyChange] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = ({ e }) => {
    e.preventDefault();
    if (!title && !category && !body) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'judul, kategori dan content harus di isi!',
      });
    } else {
      dispatch(asyncAddThread({ title, body, category }));
      navigate('/');
    }
  };

  return (
    <div className="create__thread">
      <h2>Buat Diskusi Baru</h2>
      <form onSubmit={(e) => onCreateThread({
        e, title, body, category,
      })}
      >
        <input type="text" className="create__input" placeholder="Judul" value={title} onChange={onTitleChange} />
        <input type="text" className="create__input" placeholder="Kategori" value={category} onChange={onCategoryChange} />
        <EditorToolbar toolbarId="t1" />
        <ReactQuill
          theme="snow"
          value={body}
          onChange={onBodyChange}
          placeholder="Tuliskan sesuatu..."
          modules={modules('t1')}
          formats={formats}
        />
        <button type="submit">Buat</button>
      </form>
    </div>
  );
}

export default NewDiskusiPage;

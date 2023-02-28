/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { asyncAddComment } from '../states/threadDetail/action';
import EditorToolbar, { modules, formats } from './EditorToolbar';

function KomentarCreate() {
  const [content, setContent] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();

  const addComment = () => {
    if (!content) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'komentar harus di isi!',
      });
    } else {
      dispatch(asyncAddComment(id, content));
      setContent('');
    }
  };

  return (
    <div className="diskusi__komentar">
      <h4>Beri Komentar</h4>
      <EditorToolbar toolbarId="t1" />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Tuliskan sesuatu..."
        modules={modules('t1')}
        formats={formats}
      />
      <button onClick={addComment} className="diskusi__button">Kirim</button>
    </div>
  );
}

export default KomentarCreate;

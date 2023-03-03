/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import Swal from 'sweetalert2';
import NewDiskusiInput from '../components/NewDiskusiInput';

function NewDiskusiPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = ({ title, body, category }) => {
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
      <NewDiskusiInput onCreateThread={onCreateThread} />
    </div>
  );
}

export default NewDiskusiPage;

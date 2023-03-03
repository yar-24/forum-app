/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUserAction } from '../states/authUser/action';

function RegisterPage() {
  const { authUser = null } = useSelector((states) => states);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({
    name, email, password,
  }) => {
    if (!name && !email && !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'name, emai dan password harus di isi!',
      });
    } else {
      dispatch(asyncRegisterUserAction({ name, email, password }));
    }
  };

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  return (
    <div className="login">
      <h2>Register Page</h2>
      <RegisterInput onRegister={onRegister} />
    </div>
  );
}

export default RegisterPage;

/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const { authUser = null } = useSelector((states) => states);
  const onLogin = ({ e, email, password }) => {
    e.preventDefault();
    if (!email && !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'email dan password harus di isi!',
      });
    } else {
      dispatch(asyncSetAuthUser({ email, password }));
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  return (
    <div className="login">
      <h2>Login</h2>
      <LoginInput onLogin={onLogin} />
      <div className="login__regis">
        <p>Belum punya akun? </p>
        <Link to="/register">Daftar disini</Link>
      </div>
    </div>
  );
}

export default LoginPage;

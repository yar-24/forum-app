/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useInput from '../hooks/useInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const { authUser = null } = useSelector((states) => states);
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ e }) => {
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

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={(e) => onLogin({ e, email, password })}>
        <input className="login__input" type="mail" placeholder="Email" value={email} onChange={onEmailChange} />
        <input className="login__input" type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
        <button className="login__btn" type="submit">Login</button>
      </form>
      <div className="login__regis">
        <p>Belum punya akun? </p>
        <Link to="/register">Daftar disini</Link>
      </div>
    </div>
  );
}

export default LoginPage;

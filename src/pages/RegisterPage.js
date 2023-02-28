/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import useInput from '../hooks/useInput';
import { asyncRegisterUserAction } from '../states/authUser/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onRegister = ({ e }) => {
    e.preventDefault();
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

  return (
    <div className="login">
      <h2>Register Page</h2>
      <form onSubmit={(e) => onRegister({
        e, name, email, password,
      })}
      >
        <input
          className="login__input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={onNameChange}
        />
        <input
          className="login__input"
          type="mail"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <button className="login__btn" type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;

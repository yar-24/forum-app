/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
import { PropTypes } from 'prop-types';
import React from 'react';
import useInput from '../hooks/useInput';

function RegisterInput({ onRegister }) {
  const [nama, onNamaChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form
      onSubmit={(e) => e.preventDefault(
        onRegister({
          nama,
          email,
          password,
        }),
      )
      }
    >
      <input
        className="login__input"
        type="text"
        placeholder="Name"
        value={nama}
        onChange={onNamaChange}
      />
      <input
        className="login__input"
        type="email"
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
      <button className="login__btn" type="submit">
        Register
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;

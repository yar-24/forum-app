import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form onSubmit={(e) => onLogin({ e, email, password })}>
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
      <button className="login__btn" type="submit">
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;

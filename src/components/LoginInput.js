import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ onSubmit }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form onSubmit={(e) => e.preventDefault(onSubmit({ email, password }))}>
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
      <button className="login__btn">
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginInput;

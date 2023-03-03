/* eslint-disable import/no-extraneous-dependencies */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
};

function setAuthUserAction(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

// fungsi untuk  proses login.
function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserAction(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

//   fungsi thunk untuk menangani proses logout
function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());
    try {
      dispatch(setAuthUserAction(null));
      api.putAccessToken('');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncRegisterUserAction({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.register({ name, email, password });
      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserAction,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUserAction,
};

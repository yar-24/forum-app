/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuthUserAction } from '../authUser/action';
import api from '../../utils/api';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadAction(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserAction(authUser));
    } catch (error) {
      dispatch(setAuthUserAction(null));
    } finally {
      dispatch(setIsPreloadAction(false));
    }
    dispatch(hideLoading());
  };
}

export { ActionType, setIsPreloadAction, asyncPreloadProcess };
